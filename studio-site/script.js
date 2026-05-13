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
  {
    icon: 'code',
    title: 'Vibe Coding 课程',
    description: '面向想快速进入 AI 编程工作流的人群，用真实项目练习把灵感变成可运行的产品原型。',
  },
  {
    icon: 'briefcase-business',
    title: 'AI + OPC 提效课程',
    description: '围绕办公流程、内容处理和日常协作场景，教会团队把 AI 真正接进工作方法里。',
  },
  {
    icon: 'megaphone',
    title: 'AI + 自媒体陪跑',
    description: '从定位、选题、内容生产到发布节奏，提供陪跑式共创，帮助个人或团队把 AI 和自媒体一起跑起来。',
  },
  {
    icon: 'users',
    title: '共学社群与资料领取',
    description: '可以先加入社群，领取入门资料、课程信息和实践清单，再决定是否进入课程或服务。',
  },
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
  qr.textContent = channel.qrImage ? '' : channel.name === '微信咨询' ? '请替换为微信二维码' : '二维码待替换';
  qr.style.backgroundImage = channel.qrImage ? `url("${channel.qrImage}")` : '';
  const link = document.querySelector('#dialogLink');
  link.href = channel.href;
  link.textContent = channel.href.startsWith('#') ? (channel.name === '微信咨询' ? '线下补充二维码' : '联系我获取') : '打开链接';
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
