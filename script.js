const portfolioProjects = [
  {
    title: 'AI 学习陪练',
    description: '围绕问答辅导、专项练习和模拟面试构建的 AI 陪练产品，是个人作品集中最核心的产品实践。',
    coverImage: './assets/project-ai-coach.jpg',
    href: './studio.html',
    status: '产品实践',
    tags: ['AI 产品', '学习陪练', '模拟面试'],
  },
  {
    title: '导师训练实验室',
    description: '把导师角色、能力训练和反馈标准组合成可复用的训练空间，展示角色化 AI 产品设计能力。',
    coverImage: './assets/project-mentor-lab.jpg',
    href: './studio.html#projects',
    status: '训练系统',
    tags: ['角色设计', '训练路径', '反馈机制'],
  },
  {
    title: '内容工作流系统',
    description: '沉淀小红书、公众号、视频号的选题、写作、配图和发布流程，把内容创作变成系统工程。',
    coverImage: './assets/project-content-system.jpg',
    href: '#content',
    status: '内容系统',
    tags: ['内容工作流', 'AI 协作', '增长入口'],
  },
];

const studioServices = [
  {
    title: 'AI 学习陪练产品',
    description: '把知识问答、专项练习、模拟面试和复盘反馈设计成完整陪练体验，适合课程和训练营升级。',
    coverImage: './assets/project-ai-coach.jpg',
    href: '#contact',
    status: '产品共创',
    tags: ['学习陪练', 'AI 教练', '训练闭环'],
  },
  {
    title: '课程培训',
    description: '围绕 AI 工具、产品思维、内容工作流和学习训练设计课程，帮助团队快速建立共同语言。',
    coverImage: './assets/project-mentor-lab.jpg',
    href: '#contact',
    status: '可预约',
    tags: ['课程设计', '训练营', '工作坊'],
  },
  {
    title: '企业陪跑',
    description: '陪企业团队从真实业务场景出发，搭建 AI 使用流程、内部训练机制和可复用内容资产。',
    coverImage: './assets/project-content-system.jpg',
    href: '#contact',
    status: '共创交付',
    tags: ['企业 AI', '流程共创', '内容资产'],
  },
];

const studioCases = [
  {
    icon: 'graduation-cap',
    title: '课程团队',
    description: '把原有课程升级成可练习、可反馈、可复盘的 AI 陪练型学习体验。',
  },
  {
    icon: 'briefcase-business',
    title: '企业组织',
    description: '围绕业务岗位设计 AI 工作流，让团队从“知道工具”走到“真的用起来”。',
  },
  {
    icon: 'user-round-check',
    title: '个人学习者',
    description: '用陪练、模拟面试和阶段复盘帮助学习者更稳定地建立能力。',
  },
];

const channels = [
  {
    name: '小红书',
    icon: 'heart',
    href: '#contact',
    qrImage: '',
    description: '发布 AI 学习、产品实践和内容创作的轻量笔记。',
  },
  {
    name: '微信公众号',
    icon: 'newspaper',
    href: '#contact',
    qrImage: '',
    description: '沉淀长文、项目复盘和系统化方法论。',
  },
  {
    name: '视频号',
    icon: 'video',
    href: '#contact',
    qrImage: '',
    description: '用短视频讲清楚 AI 工具、学习陪练和产品过程。',
  },
  {
    name: '微信咨询',
    icon: 'message-circle',
    href: '#contact',
    qrImage: '',
    description: '适合项目合作、课程培训、企业陪跑和学习陪练沟通。',
  },
  {
    name: '邮箱',
    icon: 'mail',
    href: 'mailto:hello@example.com',
    qrImage: '',
    description: '用于正式合作、媒体邀约和项目联络。',
  },
];

function iconMarkup(name) {
  return `<i data-lucide="${name}" aria-hidden="true"></i>`;
}

function currentProjects() {
  return document.body.dataset.site === 'studio' ? studioServices : portfolioProjects;
}

function renderProjects() {
  const grid = document.querySelector('#projectGrid');
  if (!grid) return;

  grid.innerHTML = currentProjects()
    .map((project) => {
      const tags = project.tags.map((tag) => `<span>${tag}</span>`).join('');
      const isPlaceholderLink = project.href === '#contact';
      const actionLabel = isPlaceholderLink ? '预约沟通' : '查看详情';

      return `
        <article class="project-card app-card">
          <a class="project-cover" href="${project.href}" aria-label="打开 ${project.title}">
            <img src="${project.coverImage}" alt="${project.title} 封面" loading="lazy" />
            <span>${project.status}</span>
          </a>
          <div class="project-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tag-row">${tags}</div>
            <a class="project-link" href="${project.href}">
              ${actionLabel}
              ${iconMarkup('arrow-up-right')}
            </a>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderCases() {
  const grid = document.querySelector('#caseGrid');
  if (!grid) return;

  grid.innerHTML = studioCases
    .map(
      (item) => `
        <article class="app-card about-card">
          ${iconMarkup(item.icon)}
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `,
    )
    .join('');
}

function renderChannels() {
  const grid = document.querySelector('#channelGrid');
  if (!grid) return;

  grid.innerHTML = channels
    .map(
      (channel) => `
        <button class="channel-card app-card" type="button" data-channel-button="${channel.name}">
          <span class="channel-icon">${iconMarkup(channel.icon)}</span>
          <strong>${channel.name}</strong>
          <small>${channel.description}</small>
        </button>
      `,
    )
    .join('');
}

function openChannelDialog(channelName) {
  const channel = channels.find((item) => item.name === channelName);
  const dialog = document.querySelector('#channelDialog');
  if (!channel || !dialog) return;

  const dialogIcon = document.querySelector('#dialogIcon');
  const dialogTitle = document.querySelector('#dialogTitle');
  const dialogDescription = document.querySelector('#dialogDescription');
  const dialogQr = document.querySelector('#dialogQr');
  const dialogLink = document.querySelector('#dialogLink');

  dialogIcon.innerHTML = iconMarkup(channel.icon);
  dialogTitle.textContent = channel.name;
  dialogDescription.textContent = channel.description;
  dialogQr.textContent = channel.qrImage ? '' : '二维码待替换';
  dialogQr.style.backgroundImage = channel.qrImage ? `url("${channel.qrImage}")` : '';
  dialogLink.href = channel.href;
  dialogLink.textContent = channel.href.startsWith('#') ? '联系我获取' : '打开链接';

  dialog.showModal();
  window.lucide?.createIcons();
}

function bindInteractions() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-channel-button]');
    if (button) {
      openChannelDialog(button.dataset.channelButton);
    }
  });

  const closeButton = document.querySelector('.dialog-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      document.querySelector('#channelDialog').close();
    });
  }
}

renderProjects();
renderCases();
renderChannels();
bindInteractions();

window.addEventListener('load', () => {
  window.lucide?.createIcons();
});
