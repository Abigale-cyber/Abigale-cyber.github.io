const portfolioProjects = [
  {
    title: 'AI 学习陪练展示案例',
    description: '金牌导师 AI 的学生端首页案例，展示 AI 辅导、闯关练习、学习记录和数据概览。',
    coverImage: './assets/project-examiners-home.png',
    href: 'https://81.70.39.125:8443/',
    status: '陪跑案例',
    tags: ['学生端首页', 'AI 陪练', '金牌导师'],
  },
  {
    title: 'EducationalAI 教学平台案例',
    description: '智研教学平台的教师端案例，覆盖数据看板、作业批改、答疑监控、学生管理和知识库管理。',
    coverImage: './assets/project-educational-ai-cover.png',
    href: 'https://81.70.39.125:8443/educational-ai/',
    status: '陪跑案例',
    tags: ['教学平台', '知识库管理', '教师端'],
  },
  {
    title: 'MentorGold AI 展示案例',
    description: '金牌导师 AI 的独立展示案例，呈现导师陪练、专项练习和学习路径的完整首页体验。',
    coverImage: './assets/project-mentorgold-home.png',
    href: 'https://81.70.39.125:8443/mentorgold/',
    status: '陪跑案例',
    tags: ['MentorGold', 'AI 导师', '学习陪练'],
  },
];

const tools = [
  {
    title: 'WeChat Studio',
    emoji: '💬',
    tag: 'Web App',
    description: '微信公众号自主排版工具，用 AI 辅助生成精美的公众号图文排版，告别手动调样式。',
    href: 'https://81.70.39.125:8443/wechat-studio/',
  },
  {
    title: 'Prompt Manager',
    emoji: '🧩',
    tag: 'Mac App · GitHub',
    description: '本地 Prompt 工作台，将常用提示词分类保存、模板化填写，并可在当前应用中快速唤出调用。',
    href: 'https://github.com/Abigale-cyber/Prompt_Manager',
  },
  {
    title: 'AI Desktop Planner',
    emoji: '🗓️',
    tag: 'Mac App · GitHub',
    description: '桌面端 AI 日程规划工具，用自然语言整理日程与提醒，并将确认后的安排写入系统日历。',
    href: 'https://github.com/Abigale-cyber/AIDesktopPlanner',
  },
];

const TOOLS_SHOW_COUNT = 3;

const channels = [
  { name: '微信咨询', icon: 'message-circle', href: '#contact', qrImage: './assets/wechat-qr.png', description: '如有需要，请联系我。' },
  { name: '微信公众号', icon: 'newspaper', href: '#contact', qrImage: '', description: '沉淀长文、项目复盘和系统化方法论。' },
  { name: '邮箱', icon: 'mail', href: 'mailto:hello@example.com', qrImage: '', description: '可以通过邮箱联系我。' },
];

function iconMarkup(name) {
  return `<i data-lucide="${name}" aria-hidden="true"></i>`;
}

function renderProjects() {
  const grid = document.querySelector('#projectGrid');
  if (!grid) return;

  grid.innerHTML = portfolioProjects.map((project) => {
    const tags = project.tags.map((tag) => `<span>${tag}</span>`).join('');
    const isExternal = project.href.startsWith('http');
    const linkAttrs = isExternal ? ' target="_blank" rel="noreferrer"' : '';
    return `
      <article class="project-card app-card">
        <a class="project-cover" href="${project.href}"${linkAttrs} aria-label="打开 ${project.title}">
          <img src="${project.coverImage}" alt="${project.title} 封面" loading="lazy" />
          <span>${project.status}</span>
        </a>
        <div class="project-body">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tag-row">${tags}</div>
          <a class="project-link" href="${project.href}"${linkAttrs}>查看详情 ${iconMarkup('arrow-up-right')}</a>
        </div>
      </article>
    `;
  }).join('');
}

function renderTools() {
  const list = document.querySelector('#toolsList');
  if (!list) return;

  const visibleTools = tools.slice(0, TOOLS_SHOW_COUNT);
  list.innerHTML = visibleTools.map((tool) => `
    <a class="tool-card app-card" href="${tool.href}" target="_blank" rel="noreferrer">
      <span class="tool-card-emoji">${tool.emoji}</span>
      <div class="tool-card-body">
        <div class="tool-card-header">
          <strong>${tool.title}</strong>
          <span class="tool-card-tag">${tool.tag}</span>
        </div>
        <p>${tool.description}</p>
      </div>
      <span class="tool-card-arrow">${iconMarkup('arrow-right')}</span>
    </a>
  `).join('');
}

function renderChannels() {
  const grid = document.querySelector('#channelGrid');
  if (!grid) return;

  grid.innerHTML = channels.map((channel) => `
    <button class="channel-card app-card" type="button" data-channel-button="${channel.name}">
      <span class="channel-icon">${iconMarkup(channel.icon)}</span>
      <strong>${channel.name}</strong>
      <small>${channel.description}</small>
    </button>
  `).join('');
}

function openChannelDialog(channelName) {
  const channel = channels.find((item) => item.name === channelName);
  const dialog = document.querySelector('#channelDialog');
  if (!channel || !dialog) return;

  document.querySelector('#dialogIcon').innerHTML = iconMarkup(channel.icon);
  document.querySelector('#dialogTitle').textContent = channel.name;
  document.querySelector('#dialogDescription').textContent = channel.description;
  const qr = document.querySelector('#dialogQr');
  qr.textContent = channel.qrImage ? '' : '二维码待替换';
  qr.style.backgroundImage = channel.qrImage ? `url("${channel.qrImage}")` : '';
  const link = document.querySelector('#dialogLink');
  link.href = channel.href;
  link.textContent = channel.href.startsWith('#') ? '联系我' : '打开链接';
  dialog.showModal();
  window.lucide?.createIcons();
}

function bindInteractions() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-channel-button]');
    if (button) openChannelDialog(button.dataset.channelButton);
  });
  document.querySelector('.dialog-close')?.addEventListener('click', () => {
    document.querySelector('#channelDialog')?.close();
  });
}

renderProjects();
renderTools();
renderChannels();
bindInteractions();
window.addEventListener('load', () => window.lucide?.createIcons());
