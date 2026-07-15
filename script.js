const projects = [
  {
    year: '2025',
    step: '01',
    focus: '企业级落地',
    name: '企业级员工智能客服',
    meta: ['LLM · RAG · Multi-Agent', 'XX 4万+员工', '产品 Owner'],
    summary: [
      ['业务问题', '运营、物业、招商、HR 制度分散，4 万余名员工缺少统一查询入口。'],
      ['落地方案', '用 LLM、RAG 与 Multi-Agent 构建企业智能客服，并通过 Bad Case 闭环持续优化。'],
    ],
    metrics: [
      ['78%→96%', '意图识别准确率'],
      ['×3', '信息获取效率'],
      ['500万+', '年省成本'],
    ],
    demo: 'https://81.70.39.125:8443/ai-customer-service-blue/',
  },
  {
    year: '2026',
    step: '02',
    focus: '增长场景复制',
    name: 'AI 智能销售助手',
    meta: ['LLM · RAG · Agent', '考研招生', '独立 AI 产品负责人'],
    summary: [
      ['业务问题', '招生高度依赖销冠，新人培养周期长，销售话术与跟进方法难以复制。'],
      ['落地方案', '把销冠打法沉淀成 AI 销售助手与陪练，辅助普通销售完成判断、跟进和复盘。'],
    ],
    metrics: [
      ['2个月 → 7–10天', '新人开单周期'],
      ['+85%', '招生转化率'],
      ['-60%', '客户流失率'],
    ],
    demo: 'https://81.70.39.125:8443/ai-sales-coach-orange/',
  },
  {
    year: '2026',
    step: '03',
    focus: '教学闭环规模化',
    name: 'AI 金牌导师 · 学习陪练助手',
    meta: ['LLM · RAG · Agent', '考研教学', '独立负责 + Vibe Coding'],
    summary: [
      ['业务问题', '学生练习缺少即时反馈，教师承担大量重复批改与个性化答疑工作。'],
      ['落地方案', '用 LLM、RAG 与 Agent 串联自动批改、错因分析和知识点追问，形成学习闭环。'],
    ],
    metrics: [
      ['+75%', '批改效率 12→3min'],
      ['+73%', '学生好评率'],
      ['4000+', '冲刺期日活'],
    ],
    demo: 'https://81.70.39.125:8443/educational-ai/',
  },
];

function renderProjects() {
  const list = document.querySelector('#projectList');
  if (!list) return;

  list.innerHTML = projects
    .map((project) => {
      const meta = project.meta.map((item) => `<span>${item}</span>`).join('');
      const summary = project.summary
        .map(([label, content]) => `<li><strong>${label}</strong><span>${content}</span></li>`)
        .join('');
      const metrics = project.metrics
        .map(
          ([value, label]) =>
            `<div class="metric${value.length > 9 ? ' metric-long' : ''}"><strong>${value}</strong><span>${label}</span></div>`,
        )
        .join('');
      return `
        <article class="journey-project">
          <div class="journey-marker" aria-label="${project.year} 年，第 ${project.step} 个项目">
            <span>${project.step}</span>
            <small>${project.year}</small>
          </div>
          <div class="journey-card app-card">
            <span class="journey-focus">${project.focus}</span>
            <div class="project-meta">${meta}</div>
            <h3>${project.name}</h3>
            <div class="project-summary">
              <ul>${summary}</ul>
            </div>
            <div class="metric-row">${metrics}</div>
            <a class="btn btn-primary project-demo" href="${project.demo}" target="_blank" rel="noreferrer">
              体验 Demo<i data-lucide="arrow-up-right"></i>
            </a>
          </div>
        </article>
      `;
    })
    .join('');
}

renderProjects();
window.addEventListener('load', () => window.lucide?.createIcons());
