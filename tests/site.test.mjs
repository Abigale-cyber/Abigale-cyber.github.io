import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const portfolio = readFileSync('portfolio-site/index.html', 'utf8');
const portfolioCss = readFileSync('portfolio-site/styles.css', 'utf8');
const portfolioJs = readFileSync('portfolio-site/script.js', 'utf8');
const rootIndex = readFileSync('index.html', 'utf8');
const studio = readFileSync('studio-site/index.html', 'utf8');
const studioCss = readFileSync('studio-site/styles.css', 'utf8');
const studioJs = readFileSync('studio-site/script.js', 'utf8');

for (const page of [portfolio, studio]) {
  assert.match(page, /<meta\s+[^>]*name="description"/, 'missing SEO description');
  assert.match(page, /<meta\s+[^>]*property="og:title"/, 'missing Open Graph title');
}

for (const id of ['home', 'projects', 'tools', 'contact']) {
  assert.match(portfolio, new RegExp(`id="${id}"`), `portfolio missing #${id} section`);
}

for (const id of ['home', 'projects', 'cases', 'content', 'contact']) {
  assert.match(studio, new RegExp(`id="${id}"`), `studio missing #${id} section`);
}

for (const label of ['首页', '作品', '工具', '联系']) {
  assert.match(portfolio, new RegExp(`>${label}<`), `portfolio missing nav label ${label}`);
}

assert.match(portfolio, /个人作品集/, 'portfolio must center the personal portfolio identity');
assert.match(portfolio, /AI 产品创造者/, 'portfolio must position the person separately from the studio');
assert.match(portfolio, /AI Product Portfolio/, 'portfolio must include the product portfolio hero');
assert.match(portfolio, /AI Tools/, 'portfolio must include the AI tools section');
assert.match(portfolio, /The best way to predict the future<br \/>is to invent it\./, 'portfolio quote must use the Alan Kay line');
assert.match(portfolio, /&mdash; Alan Kay/, 'portfolio quote must include attribution');
assert.doesNotMatch(portfolio, /href="[^"]*(studio-site|studio\.html)/i, 'portfolio site must not link to studio site');
assert.doesNotMatch(portfolio, /无相智境/, 'portfolio site must not include studio branding');
assert.doesNotMatch(portfolio, /Open To Collaboration|一起把 AI 想法做成产品|项目合作|微信沟通/, 'portfolio contact copy must not imply side work');

assert.equal(rootIndex, portfolio, 'GitHub Pages root must match portfolio-site/index.html');
assert.match(rootIndex, /<body data-site="portfolio">/, 'GitHub Pages root must deploy the portfolio site directly');
assert.match(rootIndex, /Abigale \| 个人作品集/, 'GitHub Pages root must use the portfolio page title');
assert.doesNotMatch(rootIndex, /Choose a site|两个入口|无相智境/, 'GitHub Pages root must not deploy the gateway page');

assert.match(studio, />首页</, 'studio missing nav label 首页');
assert.match(studio, />联系</, 'studio missing nav label 联系');
assert.match(studio, />(案例展示|案例)</, 'studio missing case nav label');
assert.match(studio, />(场景|服务)</, 'studio missing service nav label');
assert.match(studio, />内容</, 'studio missing nav label 内容');

assert.match(studio, /无相智境/, 'studio must center Wuxiangzhijing brand');
assert.match(studio, /课程培训/, 'studio must include course training');
assert.match(studio, /企业(?:\s*<span[^>]*>AI<\/span>)?\s*陪跑/, 'studio must include enterprise coaching');
assert.match(studio, /<h2>案例展示<\/h2>/, 'studio project section must present cases, not services');
assert.doesNotMatch(studio, /无相智境能做什么/, 'studio case gallery should not use service-first heading');
assert.doesNotMatch(studio, /href="[^"]*(portfolio-site|portfolio\.html)/i, 'studio site must not link to portfolio site');
assert.doesNotMatch(studio, /Abigale 个人作品集/, 'studio site must not include portfolio branding');

assert.match(portfolioJs, /const portfolioProjects/, 'portfolio data must live in portfolio-site');
assert.doesNotMatch(portfolioJs, /studioServices/, 'portfolio script must not contain studio service data');
assert.match(studioJs, /const studioServices/, 'studio data must live in studio-site');
assert.doesNotMatch(studioJs, /portfolioProjects/, 'studio script must not contain portfolio project data');
assert.match(
  portfolioJs,
  /const portfolioProjects = \[\s*\{\s*title: 'AI 学习陪练展示案例'[\s\S]*?coverImage: '\.\/assets\/project-examiners-home\.png'[\s\S]*?href: 'https:\/\/81\.70\.39\.125:8443\/'/,
  'portfolio first project must use the project homepage cover and homepage link',
);
assert.match(
  studioJs,
  /const studioServices = \[\s*\{\s*title: 'AI 学习陪练展示案例'[\s\S]*?coverImage: '\.\/assets\/project-examiners-home\.png'[\s\S]*?href: 'https:\/\/81\.70\.39\.125:8443\/'/,
  'studio first case must use the project homepage cover and homepage link',
);
assert.match(portfolioJs, /const channels = \[\s*\{\s*name: '微信咨询'/, 'portfolio channel order must put WeChat first');
assert.match(portfolioJs, /description: '如有需要，请联系我。'/, 'WeChat dialog copy must stay concise');
assert.match(portfolioJs, /\? '联系我' : '打开链接'/, 'dialog hash action should use concise contact copy');
assert.match(studioJs, /const channels = \[\s*\{\s*name: '微信咨询'/, 'studio channel order must put WeChat first');
assert.doesNotMatch(portfolioJs, /name: '小红书'/, 'portfolio channels should not include Xiaohongshu');
assert.doesNotMatch(portfolioJs, /name: '视频号'/, 'portfolio channels should not include WeChat Channels video');
assert.doesNotMatch(portfolioJs, /项目合作|作品咨询|学习陪练沟通|联系我获取|正式合作|媒体邀约|项目联络/, 'portfolio dialog copy must stay neutral');

for (const key of ['coverImage', 'href', 'status', 'tags']) {
  assert.match(portfolioJs, new RegExp(`${key}:`), `portfolio data missing ${key}`);
  assert.match(studioJs, new RegExp(`${key}:`), `studio data missing ${key}`);
}

assert.match(portfolioCss, /--blue:\s*#2f74ff/, 'portfolio missing blue glass token');
assert.match(portfolioCss, /\.aura-background-component/, 'portfolio missing aura background styles');
assert.match(portfolioCss, /\.tools-list/, 'portfolio missing tools list styles');
assert.match(portfolioCss, /backdrop-filter:\s*blur/, 'portfolio missing glassmorphism blur');
assert.match(portfolioCss, /\.project-grid/, 'portfolio missing expandable project grid styles');

assert.match(studioCss, /--gradient-page/, 'studio missing practiceAI-style page gradient token');
assert.match(studioCss, /backdrop-filter:\s*blur/, 'studio missing glassmorphism blur');
assert.match(studioCss, /--primary:\s*#7c3aed/, 'studio missing practiceAI purple token');
assert.match(studioCss, /\.project-grid/, 'studio missing expandable project grid styles');
