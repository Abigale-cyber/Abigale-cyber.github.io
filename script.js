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

const channels = [
  { name: '微信咨询', icon: 'message-circle', href: '#contact', qrImage: '', description: '适合项目合作、作品咨询和学习陪练沟通。' },
  { name: '微信公众号', icon: 'newspaper', href: '#contact', qrImage: '', description: '沉淀长文、项目复盘和系统化方法论。' },
  { name: '邮箱', icon: 'mail', href: 'mailto:hello@example.com', qrImage: '', description: '用于正式合作、媒体邀约和项目联络。' },
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
  link.textContent = channel.href.startsWith('#') ? '联系我获取' : '打开链接';
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
renderChannels();
bindInteractions();
window.addEventListener('load', () => window.lucide?.createIcons());
