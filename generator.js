const catmeta = {
  graphics: {
    title: 'graphics',
    icon: 'assets/graphics.svg',
    themeClass: 'theme-graphics'
  },
  network: {
    title: 'network',
    icon: 'assets/network.svg',
    themeClass: 'theme-network'
  },
  misc: {
    title: 'misc',
    icon: 'assets/gear.svg',
    themeClass: 'theme-misc'
  }
};

let configState = {};
let convarsData = [];

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initMobileOutput();
  await fetchConv();
  elementminmax();
  elementcfget();
  elementcopy();
});

function initTheme() {
  const themeBtn = document.getElementById('btn-theme');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  function syncThemeUI(isLight) {
    document.documentElement.classList.toggle('light-mode', isLight);
    if (isLight) {
      themeIcon.src = 'assets/moon.svg';
      themeText.textContent = 'switch to default';
    } else {
      themeIcon.src = 'assets/sun.svg';
      themeText.textContent = 'switch to light';
    }
  }

  const savedTheme = localStorage.getItem('underconfig-theme');
  syncThemeUI(savedTheme === 'light');

  themeBtn.addEventListener('click', () => {
    const nextIsLight = !document.documentElement.classList.contains('light-mode');
    localStorage.setItem('underconfig-theme', nextIsLight ? 'light' : 'dark');
    syncThemeUI(nextIsLight);
  });
}

function initMobileOutput() {
  const outputPanel = document.querySelector('.outputpanel');
  const toggleBtn = document.getElementById('btn-toggle-output');
  const faqSnippet = document.getElementById('faq-snippet');

  if (!outputPanel || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    outputPanel.classList.toggle('collapsed');
  });

  if (!faqSnippet) return;

  function updateFaqVisibility() {
    const rect = faqSnippet.getBoundingClientRect();
    const isAtFaq = rect.top <= window.innerHeight;
    outputPanel.classList.toggle('in-faq', isAtFaq);
  }

  window.addEventListener('scroll', updateFaqVisibility, { passive: true });
  window.addEventListener('resize', updateFaqVisibility, { passive: true });
  updateFaqVisibility();
}

async function fetchConv() {
  const res = await fetch('src/convars.json');
  convarsData = await res.json();

  convarsData.forEach(item => {
    configState[item.id] = item.default;
  });

  adjrender();
  genConf();
}

function adjrender() {
  const container = document.getElementById('controls-container');
  container.innerHTML = '';

  let currentCategory = null;
  let currentCatBlock = null;

  convarsData.forEach(item => {
    if (item.category !== currentCategory) {
      currentCategory = item.category;
      const meta = catmeta[currentCategory] || {
        title: currentCategory.toLowerCase(),
        icon: 'assets/gear.svg',
        themeClass: 'theme-misc'
      };

      currentCatBlock = document.createElement('div');
      currentCatBlock.className = `catblock ${meta.themeClass}`;

      currentCatBlock.innerHTML = `
        <div class="catheader">
          <img src="${meta.icon}" class="caticon" draggable="false" />
          <span class="cattitle">${meta.title}</span>
          <hr class="catline" />
        </div>
      `;
      container.appendChild(currentCatBlock);
    }

    const itemEl = document.createElement('div');
    itemEl.className = 'convitem';

    if (item.type === 'sslider') {
      itemEl.appendChild(makeslider(item));
    } else if (item.type === 'checkbox') {
      itemEl.appendChild(makecheckbox(item));
    }

    currentCatBlock.appendChild(itemEl);
  });
}

function makeslider(item) {
  const wrapper = document.createElement('div');
  wrapper.className = 'slider-container';

  const defaultIndex = item.options.indexOf(configState[item.id]);
  const currentIndex = defaultIndex !== -1 ? defaultIndex : 0;

  wrapper.innerHTML = `
    <div class="convlabel-row">
      <span class="convlabel">${item.label}</span>
      <span class="convcurrent-val" id="val-${item.id}">${configState[item.id]}</span>
    </div>
    <p class="convdesc">${item.description}</p>
    <input 
      type="range" 
      class="sslider" 
      id="input-${item.id}" 
      min="0" 
      max="${item.options.length - 1}" 
      step="1" 
      value="${currentIndex}"
    />
    <div class="slider-ticks" id="ticks-${item.id}"></div>
  `;

  const slider = wrapper.querySelector(`#input-${item.id}`);
  const valLabel = wrapper.querySelector(`#val-${item.id}`);
  const ticks = wrapper.querySelector(`#ticks-${item.id}`);

  item.options.forEach((opt, idx) => {
    const tick = document.createElement('span');
    tick.className = `slider-tick ${idx === currentIndex ? 'active' : ''}`;
    tick.innerText = opt;

    const pct = item.options.length > 1 ? idx / (item.options.length - 1) : 0;
    tick.style.left = `calc(8px + (100% - 16px) * ${pct})`;

    tick.addEventListener('click', () => {
      slider.value = idx;
      slider.dispatchEvent(new Event('input'));
    });
    ticks.appendChild(tick);
  });

  slider.addEventListener('input', (e) => {
    const selectedIdx = parseInt(e.target.value, 10);
    const chosenOption = item.options[selectedIdx];
    configState[item.id] = chosenOption;
    valLabel.innerText = chosenOption;

    const allTicks = ticks.querySelectorAll('.slider-tick');
    allTicks.forEach((t, i) => t.classList.toggle('active', i === selectedIdx));

    genConf();
  });

  return wrapper;
}

function makecheckbox(item) {
  const labelWrapper = document.createElement('label');
  labelWrapper.className = 'checkbox-row';

  const isChecked = configState[item.id] === true;

  labelWrapper.innerHTML = `
    <input 
      type="checkbox" 
      class="checkbox-native" 
      id="input-${item.id}" 
      ${isChecked ? 'checked' : ''}
    />
    <div class="checkbox-custom">
      <img src="assets/checkbox.svg" class="checkbox-icon" />
    </div>
    <div class="checkbox-text">
      <div class="convlabel">${item.label}</div>
      <p class="convdesc">${item.description}</p>
    </div>
  `;

  const input = labelWrapper.querySelector(`#input-${item.id}`);
  input.addEventListener('change', (e) => {
    configState[item.id] = e.target.checked;
    genConf();
  });

  return labelWrapper;
}

function elementminmax() {
  const excludedIds = ['cput', 'gamma'];

  document.getElementById('btn-min').addEventListener('click', () => {
    convarsData.forEach(item => {
      if (excludedIds.includes(item.id)) return;

      if (item.type === 'sslider') {
        configState[item.id] = item.options[0];
      } else if (item.type === 'checkbox') {
        configState[item.id] = item.lowestBool !== undefined ? item.lowestBool : false;
      }
    });
    uisync();
    genConf();
  });

  document.getElementById('btn-max').addEventListener('click', () => {
    convarsData.forEach(item => {
      if (excludedIds.includes(item.id)) return;

      if (item.type === 'sslider') {
        configState[item.id] = item.options[item.options.length - 1];
      } else if (item.type === 'checkbox') {
        configState[item.id] = item.highestBool !== undefined ? item.highestBool : true;
      }
    });
    uisync();
    genConf();
  });
}

function uisync() {
  convarsData.forEach(item => {
    const input = document.getElementById(`input-${item.id}`);
    if (!input) return;

    if (item.type === 'sslider') {
      const idx = item.options.indexOf(configState[item.id]);
      input.value = idx !== -1 ? idx : 0;
      const valLabel = document.getElementById(`val-${item.id}`);
      if (valLabel) valLabel.innerText = configState[item.id];

      const ticks = document.getElementById(`ticks-${item.id}`);
      if (ticks) {
        const allTicks = ticks.querySelectorAll('.slider-tick');
        allTicks.forEach((t, i) => t.classList.toggle('active', i === idx));
      }
    } else if (item.type === 'checkbox') {
      input.checked = !!configState[item.id];
    }
  });
}

function genConf() {
  const outputEl = document.getElementById('cfg-output');
  let cfgLines = [];

  cfgLines.push('con_enable 1; sv_cheats 1; sv_allow_point_servercommand always; fov_desired 90');
  cfgLines.push('// ..........................................................');

  const categoryOrder = [];
  const categoryItems = {};

  convarsData.forEach(item => {
    const cat = item.category;
    if (!categoryItems[cat]) {
      categoryOrder.push(cat);
      categoryItems[cat] = [];
    }
    categoryItems[cat].push(item);
  });

  categoryOrder.forEach(cat => {
    const catLines = [];
    let hasActiveNetworkSetting = false;

    categoryItems[cat].forEach(item => {
      const selectedValue = configState[item.id];
      const presetKey = String(selectedValue);
      const commands = item.presets ? item.presets[presetKey] : null;

      if (!commands) return;

      let cmdLines = [];
      if (Array.isArray(commands)) {
        cmdLines = commands.slice();
      } else if (typeof commands === 'object') {
        cmdLines = Object.entries(commands).map(([cvar, val]) => `${cvar} ${val}`);
      }

      if (cmdLines.length === 0) return;

      if (cat.toLowerCase() === 'network') {
        if (item.type === 'checkbox' && selectedValue === true) {
          hasActiveNetworkSetting = true;
        } else if (item.type !== 'checkbox') {
          hasActiveNetworkSetting = true;
        }
      }

      if (catLines.length > 0) catLines.push('');

      if (item.id !== 'ascii') {
        if (item.type === 'checkbox') {
          const statusText = selectedValue === true ? 'enabled' : 'disabled';
          catLines.push(`// ${item.label}: ${statusText}`);
        } else {
          catLines.push(`// ${item.label}: ${selectedValue}`);
        }
      }

      cmdLines.forEach(cmd => catLines.push(cmd));
    });

    if (cat.toLowerCase() === 'network' && !hasActiveNetworkSetting) return;
    if (catLines.length === 0) return;

    cfgLines.push(`\n// ~ ${cat.toLowerCase()} ~`);
    catLines.forEach(line => cfgLines.push(line));
  });

  cfgLines.push('');
  cfgLines.push('// ..........................................................');
  cfgLines.push('echo "underconfig loaded! (｡･ω･｡)"');

  outputEl.textContent = cfgLines.join('\n').trim();
}

function elementcfget() {
  const downloadBtn = document.getElementById('btn-down');
  downloadBtn.addEventListener('click', () => {
    const text = document.getElementById('cfg-output').textContent;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'autoexec.cfg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

function elementcopy() {
  const copyBtn = document.getElementById('btn-copy');
  copyBtn.addEventListener('click', async () => {
    const text = document.getElementById('cfg-output').textContent;
    await navigator.clipboard.writeText(text);
    const originalText = copyBtn.innerText;
    copyBtn.innerText = 'copied!';
    setTimeout(() => {
      copyBtn.innerText = originalText;
    }, 1500);
  });
}