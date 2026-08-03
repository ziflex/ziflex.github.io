import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/projects/',
  '/projects/ferret/',
  '/projects/lecho/',
  '/projects/waitfor/',
  '/projects/dbx/',
  '/projects/node-red-tools/',
  '/projects/throttle/',
  '/archive/',
  '/about/',
  '/writing/',
  '/now/',
];

test.describe('static routes', () => {
  for (const route of routes) {
    test(`${route} renders without accessibility violations`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.ok()).toBe(true);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();

      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('unknown routes use the custom 404 page', async ({ page }) => {
    const response = await page.goto('/a-drawer-that-does-not-exist/');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Nothing is filed here.' })).toBeVisible();
    await expect(page.getByText('404', { exact: true })).toBeVisible();
  });
});

test.describe('navigation and resilient layouts', () => {
  test('skip link, keyboard focus, landmarks, and current-page navigation work', async ({
    page,
  }) => {
    await page.goto('/projects/ferret/');
    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    expect(await skipLink.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe(
      'none',
    );

    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Elsewhere' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  for (const route of ['/', '/projects/', '/projects/node-red-tools/', '/archive/', '/writing/']) {
    test(`${route} has no horizontal overflow`, async ({ page }) => {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    });
  }

  test('navigation and primary content work with JavaScript disabled', async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`${baseURL}/`);
    await page.getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL(`${baseURL}/projects/`);
    await expect(page.getByRole('heading', { name: 'Work with a point of view.' })).toBeVisible();
    await context.close();
  });
});

test.describe('project taxonomy', () => {
  test('homepage only presents current projects', async ({ page }) => {
    await page.goto('/');

    const current = page.locator('section[aria-labelledby="featured-heading"]');
    await expect(current.locator('.project-preview h3 a')).toHaveText([
      'Ferret',
      'lecho',
      'waitfor',
      'dbx',
    ]);
    await expect(current.getByRole('link', { name: 'Node-RED Tools' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Selected Past Work' })).toHaveCount(0);
  });

  test('project index only presents current selected projects', async ({ page }) => {
    await page.goto('/projects/');

    const language = page.locator('section[aria-labelledby="group-language-and-runtime"]');
    const go = page.locator('section[aria-labelledby="group-go-infrastructure"]');

    await expect(language.locator('.project-preview h3 a')).toHaveText(['Ferret']);
    await expect(go.locator('.project-preview h3 a')).toHaveText([
      'lecho',
      'waitfor',
      'dbx',
      'throttle',
    ]);
    await expect(language.getByRole('link', { name: 'Node-RED Tools' })).toHaveCount(0);
    await expect(go.getByRole('link', { name: 'Node-RED Tools' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Selected Past Work' })).toHaveCount(0);
  });

  test('archive lists Node-RED Tools as an ordinary archived project', async ({ page }) => {
    await page.goto('/archive/');

    const connectedSystems = page.locator('section[aria-labelledby="connected-systems"]');
    await expect(
      connectedSystems.getByRole('heading', { name: 'Connected Systems', exact: true }),
    ).toBeVisible();
    const nodeRedTools = connectedSystems
      .locator('.archive-entry')
      .filter({ hasText: 'Node-RED Tools' });
    await expect(connectedSystems.getByRole('link', { name: 'Node-RED Tools' })).toHaveAttribute(
      'href',
      'https://github.com/node-red-tools',
    );
    await expect(nodeRedTools.getByText('2020–2022', { exact: true })).toBeVisible();
    await expect(nodeRedTools.getByText('archived', { exact: true })).toBeVisible();
    await expect(connectedSystems.getByRole('link', { name: 'project story' })).toHaveAttribute(
      'href',
      '/projects/node-red-tools/',
    );

    const beagle = connectedSystems.locator('.archive-entry').filter({ hasText: 'Beagle' });
    await expect(beagle.getByText('Since 2017', { exact: true })).toBeVisible();
    await expect(beagle.getByText('archived', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Selected Past Work' })).toHaveCount(0);
  });

  test('Node-RED Tools story states its historical lifecycle and authorship', async ({ page }) => {
    await page.goto('/projects/node-red-tools/');

    const facts = page.locator('.project-facts');
    await expect(facts).toContainText('2020–2022');
    await expect(facts).toContainText('archived');
    await expect(facts).toContainText('Created and maintained by Timofei Voronov');
    await expect(page.getByRole('heading', { name: 'What it was' })).toBeVisible();
    await expect(
      page.getByText('It was active from 2020 to 2022 and is now archived.'),
    ).toBeVisible();

    const schema = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
    );
    expect(schema).toMatchObject({
      '@type': 'SoftwareSourceCode',
      name: 'Node-RED Tools',
      creativeWorkStatus: 'archived',
      temporalCoverage: '2020/2022',
      sameAs: 'https://github.com/node-red-tools',
      author: { name: 'Timofei Voronov' },
    });
    expect(schema).not.toHaveProperty('codeRepository');
  });
});

test.describe('system preferences', () => {
  test('light and dark themes expose distinct high-contrast surfaces', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const light = await page.locator('body').evaluate((element) => ({
      background: getComputedStyle(element).backgroundColor,
      color: getComputedStyle(element).color,
    }));

    await page.emulateMedia({ colorScheme: 'dark' });
    const dark = await page.locator('body').evaluate((element) => ({
      background: getComputedStyle(element).backgroundColor,
      color: getComputedStyle(element).color,
    }));

    expect(light).not.toEqual(dark);
    expect(light.background).toBe('rgb(243, 239, 231)');
    expect(dark.background).toBe('rgb(25, 24, 21)');

    const results = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    expect(results.violations).toEqual([]);
  });

  test('reduced motion disables smooth scrolling and transitions', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    expect(
      await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior),
    ).toBe('auto');
    const duration = await page
      .getByRole('link', { name: 'Projects', exact: true })
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration));
    expect(duration).toBeLessThanOrEqual(0.00001);
  });
});

test.describe('publication and metadata contracts', () => {
  test('draft writing is excluded from route, index, RSS, and sitemap', async ({
    page,
    request,
  }) => {
    const draft = await request.get('/writing/typography-sample/');
    expect(draft.status()).toBe(404);

    await page.goto('/writing/');
    await expect(page.getByText('Workshop Typography Sample')).toHaveCount(0);

    for (const route of ['/rss.xml', '/sitemap-0.xml']) {
      const response = await request.get(route);
      expect(response.ok()).toBe(true);
      expect(await response.text()).not.toContain('typography-sample');
    }
  });

  test('canonical, Open Graph, RSS discovery, and Person JSON-LD are emitted', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://tvoronov.dev/',
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      /Timofei Voronov/,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://tvoronov.dev/og.png',
    );
    await expect(page.locator('link[type="application/rss+xml"]')).toHaveAttribute(
      'href',
      'https://tvoronov.dev/rss.xml',
    );

    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemas.map((schema) => JSON.parse(schema)['@type'])).toContain('Person');
  });

  test('project stories emit SoftwareSourceCode JSON-LD', async ({ page }) => {
    await page.goto('/projects/ferret/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://tvoronov.dev/projects/ferret/',
    );
    const schema = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
    );
    expect(schema).toMatchObject({
      '@type': 'SoftwareSourceCode',
      name: 'Ferret',
      codeRepository: 'https://github.com/MontFerret/ferret',
    });
  });

  test('analytics is absent without configuration and public contact links are emitted', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:tim@tvoronov.dev',
    );
  });
});
