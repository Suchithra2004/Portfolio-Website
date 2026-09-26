import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';

export async function openBrowser() {
  const executablePath = process.env.BROWSER_PATH || [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/chromium', '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find(existsSync);
  if (!executablePath) throw new Error('Set BROWSER_PATH to an installed Chromium browser.');
  return chromium.launch({ executablePath, headless: true, args: ['--disable-gpu', '--disable-dev-shm-usage'] });
}
