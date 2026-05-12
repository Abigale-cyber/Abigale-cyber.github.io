const studioServices = [
  {
    title: 'AI 学习陪练展示案例',
    description: '无相智境参与打造的学生端首页案例，覆盖 AI 辅导、闯关练习、学习记录和数据概览。',
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
    title: '企业 AI 陪跑案例',
    description: '从真实业务场景出发，呈现 AI 使用流程、内部训练机制和可复用内容资产的陪跑成果。',
    coverImage: './assets/project-mentorgold-home.png',
    href: 'https://81.70.39.125:8443/mentorgold/',
    status: '陪跑案例',
    tags: ['企业 AI', '流程共创', '内容资产'],
  },
];

const studioCases = [
  { icon: 'graduation-cap', title: '课程团队', description: '把原有课程升级成可练习、可反馈、可复盘的 AI 陪练型学习体验。' },
  { icon: 'briefcase-business', title: '企业组织', description: '围绕业务岗位设计 AI 工作流，让团队从“知道工具”走到“真的用起来”。' },
  { icon: 'user-round-check', title: '个人学习者', description: '用陪练、模拟面试和阶段复盘帮助学习者更稳定地建立能力。' },
];

const channels = [
  { name: '微信咨询', icon: 'message-circle', href: '#contact', qrImage: '', description: '适合课程培训、企业陪跑和学习陪练沟通。' },
  { name: '小红书', icon: 'heart', href: '#contact', qrImage: '', description: '发布 AI 学习、产品实践和内容创作的轻量笔记。' },
  { name: '微信公众号', icon: 'newspaper', href: '#contact', qrImage: '', description: '沉淀长文、项目复盘和系统化方法论。' },
  { name: '视频号', icon: 'video', href: '#contact', qrImage: '', description: '用短视频讲清楚 AI 工具、学习陪练和产品过程。' },
  { name: '邮箱', icon: 'mail', href: 'mailto:hello@example.com', qrImage: '', description: '用于正式合作、媒体邀约和项目联络。' },
];

function iconMarkup(name) {
  return `<i data-lucide="${name}" aria-hidden="true"></i>`;
}

function renderServices() {
  const grid = document.querySelector('#projectGrid');
  if (!grid) return;

  grid.innerHTML = studioServices.map((service) => {
    const tags = service.tags.map((tag) => `<span>${tag}</span>`).join('');
    const isExternal = service.href.startsWith('http');
    const linkAttrs = isExternal ? ' target="_blank" rel="noreferrer"' : '';
    return `
      <article class="project-card app-card">
        <a class="project-cover" href="${service.href}"${linkAttrs} aria-label="了解 ${service.title}">
          <img src="${service.coverImage}" alt="${service.title} 封面" loading="lazy" />
          <span>${service.status}</span>
        </a>
        <div class="project-body">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <div class="tag-row">${tags}</div>
          <a class="project-link" href="${service.href}"${linkAttrs}>查看案例 ${iconMarkup('arrow-up-right')}</a>
        </div>
      </article>
    `;
  }).join('');
}

function renderCases() {
  const grid = document.querySelector('#caseGrid');
  if (!grid) return;

  grid.innerHTML = studioCases.map((item) => `
    <article class="app-card about-card">
      ${iconMarkup(item.icon)}
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
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

renderServices();
renderCases();
renderChannels();
bindInteractions();
window.addEventListener('load', () => window.lucide?.createIcons());
