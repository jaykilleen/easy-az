// EZ-AZ Game Cover Art
// Canvas cover art drawing functions for each game box.
// Each IIFE references a canvas by hardcoded ID matching the store shelf.

// Draw the Space Dodge cover art on the canvas
(function () {
  const canvas = document.getElementById('spaceDodgeCover');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Space background
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0b0b2a');
  grad.addColorStop(0.5, '#1a0a2e');
  grad.addColorStop(1, '#0b0b2a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Stars
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 1.5 + 0.3;
    const alpha = Math.random() * 0.7 + 0.3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  }

  // Planet in background
  ctx.beginPath();
  ctx.arc(160, 60, 30, 0, Math.PI * 2);
  const planetGrad = ctx.createRadialGradient(155, 55, 5, 160, 60, 30);
  planetGrad.addColorStop(0, '#4a6fff');
  planetGrad.addColorStop(1, '#1a1a4a');
  ctx.fillStyle = planetGrad;
  ctx.fill();

  // Planet ring
  ctx.beginPath();
  ctx.ellipse(160, 60, 44, 10, -0.2, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(100, 150, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Ship 1 (Player 1 - blue)
  function drawShip(x, y, color, glowColor) {
    // Glow
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.moveTo(x, y - 16);
    ctx.lineTo(x - 12, y + 12);
    ctx.lineTo(x, y + 6);
    ctx.lineTo(x + 12, y + 12);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Cockpit
    ctx.beginPath();
    ctx.arc(x, y - 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = glowColor;
    ctx.fill();

    // Engine flame
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(x - 5, y + 12);
    ctx.lineTo(x, y + 22);
    ctx.lineTo(x + 5, y + 12);
    ctx.fillStyle = '#ff8800';
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
  }

  drawShip(80, 190, '#4488ff', '#66aaff');
  drawShip(140, 200, '#ff8844', '#ffaa66');

  // Laser beams
  ctx.shadowColor = '#ff4444';
  ctx.shadowBlur = 6;
  ctx.strokeStyle = '#ff4444';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 174);
  ctx.lineTo(75, 130);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(140, 184);
  ctx.lineTo(145, 140);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Asteroids
  function drawAsteroid(x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const jitter = r * (0.7 + Math.random() * 0.5);
      const px = x + Math.cos(angle) * jitter;
      const py = y + Math.sin(angle) * jitter;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = '#555';
    ctx.fill();
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  drawAsteroid(40, 120, 12);
  drawAsteroid(180, 130, 9);
  drawAsteroid(110, 100, 7);

  // Explosion / power-up glow
  ctx.beginPath();
  ctx.arc(40, 120, 16, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 100, 0, 0.15)';
  ctx.fill();

  // Title text
  ctx.shadowColor = '#ff6ec7';
  ctx.shadowBlur = 10;
  ctx.font = 'bold 18px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText('SPACE', W / 2, H - 48);
  ctx.fillText('DODGE', W / 2, H - 24);
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Rating badge
  ctx.fillStyle = '#ffe44d';
  ctx.font = 'bold 10px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('E', 12, 26);
  ctx.strokeStyle = '#ffe44d';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(6, 12, 20, 20);
})();

// Draw the Bloom cover art on the canvas
(function () {
  const canvas = document.getElementById('bloomCover');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Dark grey landscape background
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#1a1a1a');
  grad.addColorStop(0.6, '#222222');
  grad.addColorStop(1, '#181818');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Grey hills in background
  ctx.beginPath();
  ctx.moveTo(0, 180);
  ctx.quadraticCurveTo(60, 140, 120, 170);
  ctx.quadraticCurveTo(180, 200, 220, 180);
  ctx.lineTo(220, H);
  ctx.lineTo(0, H);
  ctx.fillStyle = '#252525';
  ctx.fill();

  // Grey ground
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 200, W, H - 200);

  // Grey trees
  for (let i = 0; i < 5; i++) {
    const tx = 20 + i * 45;
    const ty = 140 + (i % 2) * 20;
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(tx + 6, ty + 15, 6, 12);
    ctx.beginPath();
    ctx.arc(tx + 9, ty + 10, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#2d2d2d';
    ctx.fill();
  }

  // Glowing heart in the centre
  const hx = W / 2;
  const hy = 130;

  // Colour bloom radius from heart
  const bloomR = 70;
  const bloomGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, bloomR);
  bloomGrad.addColorStop(0, 'rgba(90, 140, 50, 0.4)');
  bloomGrad.addColorStop(0.5, 'rgba(60, 100, 30, 0.2)');
  bloomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = bloomGrad;
  ctx.beginPath();
  ctx.arc(hx, hy, bloomR, 0, Math.PI * 2);
  ctx.fill();

  // Heart glow
  ctx.beginPath();
  ctx.arc(hx, hy, 18, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 80, 128, 0.2)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(hx, hy, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 80, 128, 0.3)';
  ctx.fill();

  // Heart shape
  ctx.save();
  ctx.translate(hx, hy);
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(-9, -4, -15, -11, -9, -15);
  ctx.bezierCurveTo(-3, -19, 0, -13, 0, -9);
  ctx.bezierCurveTo(0, -13, 3, -19, 9, -15);
  ctx.bezierCurveTo(15, -11, 9, -4, 0, 5);
  ctx.fillStyle = '#ff5080';
  ctx.fill();
  ctx.restore();

  // Small Az in centre bottom
  const ax = W / 2;
  const ay = 195;

  // Az body
  ctx.fillStyle = '#00cc88';
  ctx.fillRect(ax - 5, ay, 10, 12);
  // Belly
  ctx.fillStyle = '#66eebb';
  ctx.fillRect(ax - 3, ay + 2, 6, 7);
  // Head
  ctx.beginPath();
  ctx.arc(ax, ay - 4, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#00cc88';
  ctx.fill();
  // Spikes
  ctx.fillStyle = '#00aa66';
  for (let s = -1; s <= 1; s++) {
    ctx.beginPath();
    ctx.moveTo(ax + s * 4 - 1.5, ay - 9);
    ctx.lineTo(ax + s * 4, ay - 14);
    ctx.lineTo(ax + s * 4 + 1.5, ay - 9);
    ctx.fill();
  }
  // Eyes
  ctx.fillStyle = 'white';
  ctx.beginPath(); ctx.arc(ax - 3, ay - 5, 2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(ax + 3, ay - 5, 2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.arc(ax - 2.5, ay - 4.5, 1, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(ax + 3.5, ay - 4.5, 1, 0, Math.PI * 2); ctx.fill();
  // Feet
  ctx.fillStyle = '#00bb77';
  ctx.fillRect(ax - 5, ay + 12, 4, 3);
  ctx.fillRect(ax + 1, ay + 12, 4, 3);

  // Title text
  ctx.shadowColor = '#00cc88';
  ctx.shadowBlur = 10;
  ctx.font = 'bold 22px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText('BLOOM', W / 2, H - 28);
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Rating badge
  ctx.fillStyle = '#ffe44d';
  ctx.font = 'bold 10px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('E', 12, 26);
  ctx.strokeStyle = '#ffe44d';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(6, 12, 20, 20);
})();

// Draw the Cat vs Mouse cover art on the canvas
(function () {
  const canvas = document.getElementById('catMouseCover');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Warm dark background
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#1a1008');
  grad.addColorStop(0.5, '#221a0e');
  grad.addColorStop(1, '#1a1008');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Floor line
  ctx.strokeStyle = '#3a2a15';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 200);
  ctx.lineTo(W, 200);
  ctx.stroke();

  // Pegs
  const pegs = [{x: 50, y: 80}, {x: 170, y: 70}, {x: 180, y: 160}, {x: 60, y: 150}];
  pegs.forEach(function(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#8B7355';
    ctx.fill();
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Rope between pegs
  ctx.beginPath();
  ctx.moveTo(pegs[0].x, pegs[0].y);
  for (let i = 1; i < pegs.length; i++) {
    ctx.lineTo(pegs[i].x, pegs[i].y);
  }
  ctx.strokeStyle = '#c8a050';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([6, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Cat (left side)
  const cx = 70, cy = 185;
  // Body
  ctx.fillStyle = '#e8a030';
  ctx.beginPath();
  ctx.ellipse(cx, cy, 14, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  // Head
  ctx.beginPath();
  ctx.arc(cx - 10, cy - 12, 10, 0, Math.PI * 2);
  ctx.fill();
  // Ears
  ctx.fillStyle = '#d08820';
  ctx.beginPath();
  ctx.moveTo(cx - 18, cy - 18);
  ctx.lineTo(cx - 14, cy - 28);
  ctx.lineTo(cx - 10, cy - 18);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 6, cy - 18);
  ctx.lineTo(cx - 2, cy - 28);
  ctx.lineTo(cx + 2, cy - 18);
  ctx.fill();
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(cx - 13, cy - 14, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx - 6, cy - 14, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.arc(cx - 12, cy - 14, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx - 5, cy - 14, 1.5, 0, Math.PI * 2); ctx.fill();
  // Nose
  ctx.fillStyle = '#ff8899';
  ctx.beginPath();
  ctx.moveTo(cx - 10, cy - 9);
  ctx.lineTo(cx - 8, cy - 7);
  ctx.lineTo(cx - 12, cy - 7);
  ctx.fill();
  // Tail
  ctx.strokeStyle = '#e8a030';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx + 14, cy);
  ctx.quadraticCurveTo(cx + 28, cy - 20, cx + 22, cy - 30);
  ctx.stroke();

  // Mouse (right side)
  const mx = 155, my = 188;
  // Body
  ctx.fillStyle = '#999';
  ctx.beginPath();
  ctx.ellipse(mx, my, 8, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  // Head
  ctx.beginPath();
  ctx.arc(mx + 8, my - 3, 6, 0, Math.PI * 2);
  ctx.fill();
  // Ear
  ctx.fillStyle = '#bbb';
  ctx.beginPath();
  ctx.arc(mx + 10, my - 9, 4, 0, Math.PI * 2);
  ctx.fill();
  // Eye
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.arc(mx + 11, my - 4, 1.5, 0, Math.PI * 2);
  ctx.fill();
  // Tail
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(mx - 8, my);
  ctx.quadraticCurveTo(mx - 18, my + 8, mx - 22, my + 2);
  ctx.stroke();

  // Title text
  ctx.shadowColor = '#f0c040';
  ctx.shadowBlur = 10;
  ctx.font = 'bold 18px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText('CAT VS', W / 2, H - 48);
  ctx.fillText('MOUSE', W / 2, H - 24);
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Rating badge
  ctx.fillStyle = '#ffe44d';
  ctx.font = 'bold 10px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('E', 12, 26);
  ctx.strokeStyle = '#ffe44d';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(6, 12, 20, 20);
})();

// Draw the Dodgeball cover art
(function () {
  const canvas = document.getElementById('dodgeballCover');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Gymnasium floor background
  for (let y = 0; y < H; y += 8) {
    for (let x = 0; x < W; x += 20) {
      const row = Math.floor(y / 8);
      const offsetX = (row % 2) * 10;
      const shade = ((Math.floor((x + offsetX) / 20) + row) % 2 === 0) ? '#6B4914' : '#805919';
      ctx.fillStyle = shade;
      ctx.fillRect(x, y, 20, 8);
    }
  }

  // Centre line
  ctx.strokeStyle = '#e44';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.48);
  ctx.lineTo(W, H * 0.48);
  ctx.stroke();

  // Court boundary
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 30, W - 20, H - 80);

  // Centre circle
  ctx.beginPath();
  ctx.arc(W / 2, H * 0.48, 30, 0, Math.PI * 2);
  ctx.strokeStyle = '#e44';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Red player (top)
  function drawPlayer(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fdb';
    ctx.beginPath();
    ctx.arc(x, y - 4, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawPlayer(80, 90, '#e44');
  drawPlayer(150, 75, '#e44');
  drawPlayer(70, 170, '#48f');
  drawPlayer(160, 185, '#48f');

  // Balls
  function drawBall(x, y) {
    ctx.fillStyle = '#f80';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath();
    ctx.arc(x - 1.5, y - 1.5, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  drawBall(110, H * 0.48);
  drawBall(W / 2, H * 0.48 - 8);
  drawBall(160, H * 0.48 + 5);

  // Speed lines from a thrown ball
  ctx.strokeStyle = 'rgba(255,136,0,0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(160, H * 0.48 + 5);
  ctx.lineTo(150, 80);
  ctx.stroke();

  // Referee
  ctx.fillStyle = '#222';
  ctx.fillRect(W / 2 - 6, H * 0.48 - 6, 12, 12);
  ctx.fillStyle = '#ddd';
  ctx.fillRect(W / 2 - 4, H * 0.48 - 4, 8, 2);
  ctx.fillRect(W / 2 - 4, H * 0.48, 8, 2);

  // "1988" big text
  ctx.save();
  ctx.font = 'bold 40px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,228,77,0.15)';
  ctx.fillText('1988', W / 2, H / 2 + 15);
  ctx.restore();

  // Title text
  ctx.shadowColor = '#e44';
  ctx.shadowBlur = 10;
  ctx.font = 'bold 14px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText('DODGEBALL', W / 2, H - 38);
  ctx.font = 'bold 9px "Press Start 2P", monospace';
  ctx.fillStyle = '#ffe44d';
  ctx.fillText('WORLD CHAMP', W / 2, H - 20);
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Rating badge
  ctx.fillStyle = '#ffe44d';
  ctx.font = 'bold 10px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('E', 12, 26);
  ctx.strokeStyle = '#ffe44d';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(6, 12, 20, 20);
})();

// Draw the Descent cover art
(function () {
  const canvas = document.getElementById('descentCover');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Dark background
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0a0a0a');
  grad.addColorStop(0.5, '#111118');
  grad.addColorStop(1, '#000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Maze walls
  ctx.strokeStyle = '#3a3a4a';
  ctx.lineWidth = 2;
  // Procedural mini-maze pattern
  const cs = 22;
  const seed = [1,0,1,1,0,1,0,0,1,1,0,1,1,0,0,1,0,1,1,0,1,0,1,1,0,0,1,0,1,1];
  let si = 0;
  for (let y = 30; y < H - 60; y += cs) {
    for (let x = 10; x < W - 10; x += cs) {
      const s = seed[si % seed.length];
      si++;
      if (s) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + cs);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cs, y);
        ctx.stroke();
      }
    }
  }

  // Flashlight cone from centre
  const cx = W / 2, cy = H * 0.45;
  const coneGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120);
  coneGrad.addColorStop(0, 'rgba(255, 240, 200, 0.25)');
  coneGrad.addColorStop(0.6, 'rgba(255, 240, 200, 0.08)');
  coneGrad.addColorStop(1, 'rgba(255, 240, 200, 0)');
  ctx.fillStyle = coneGrad;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  const angle = -Math.PI / 2;
  const spread = Math.PI / 5;
  ctx.lineTo(cx + Math.cos(angle - spread) * 140, cy + Math.sin(angle - spread) * 140);
  ctx.lineTo(cx + Math.cos(angle + spread) * 140, cy + Math.sin(angle + spread) * 140);
  ctx.closePath();
  ctx.fill();

  // Character silhouette (small circle)
  ctx.fillStyle = '#a0a0a0';
  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fill();
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(cx - 2, cy - 3, 2, 0, Math.PI * 2);
  ctx.arc(cx + 2, cy - 3, 2, 0, Math.PI * 2);
  ctx.fill();

  // Breadcrumbs
  const crumbs = [[80, 100], [160, 70], [50, 180], [180, 160], [100, 220], [140, 250]];
  crumbs.forEach(function(p) {
    ctx.fillStyle = 'rgba(200, 180, 150, 0.3)';
    ctx.beginPath();
    ctx.arc(p[0], p[1], 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Guitar glow at bottom
  ctx.fillStyle = 'rgba(255, 228, 77, 0.12)';
  ctx.beginPath();
  ctx.arc(W / 2, H - 70, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 228, 77, 0.06)';
  ctx.beginPath();
  ctx.arc(W / 2, H - 70, 35, 0, Math.PI * 2);
  ctx.fill();

  // Title text
  ctx.shadowColor = '#888';
  ctx.shadowBlur = 8;
  ctx.font = 'bold 16px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#aaa';
  ctx.fillText('DESCENT', W / 2, H - 28);
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Rating badge
  ctx.fillStyle = '#888';
  ctx.font = 'bold 10px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('E', 12, 26);
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(6, 12, 20, 20);
})();

// Draw the Corrupted cover art
(function () {
  var canvas = document.getElementById('corruptedCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  // Dark purple corridor background
  var grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0a001a');
  grad.addColorStop(0.5, '#150030');
  grad.addColorStop(1, '#0a001a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // First-person corridor walls (perspective lines)
  ctx.strokeStyle = '#3a1858';
  ctx.lineWidth = 2;
  // Left wall
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(60, 60);
  ctx.moveTo(0, H - 60); ctx.lineTo(60, H - 120);
  ctx.moveTo(0, 40); ctx.lineTo(50, 80);
  ctx.stroke();
  // Right wall
  ctx.beginPath();
  ctx.moveTo(W, 0); ctx.lineTo(W - 60, 60);
  ctx.moveTo(W, H - 60); ctx.lineTo(W - 60, H - 120);
  ctx.moveTo(W, 40); ctx.lineTo(W - 50, 80);
  ctx.stroke();

  // Corridor walls solid
  ctx.fillStyle = '#1a0830';
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(60, 50); ctx.lineTo(60, H - 110); ctx.lineTo(0, H - 50);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(W, 0); ctx.lineTo(W - 60, 50); ctx.lineTo(W - 60, H - 110); ctx.lineTo(W, H - 50);
  ctx.fill();

  // Floor
  ctx.fillStyle = '#100020';
  ctx.beginPath();
  ctx.moveTo(60, H - 110); ctx.lineTo(W - 60, H - 110);
  ctx.lineTo(W, H - 50); ctx.lineTo(0, H - 50);
  ctx.fill();

  // Ceiling
  ctx.fillStyle = '#080010';
  ctx.beginPath();
  ctx.moveTo(60, 50); ctx.lineTo(W - 60, 50);
  ctx.lineTo(W, 0); ctx.lineTo(0, 0);
  ctx.fill();

  // Zombie silhouette in corridor
  var zx = W / 2, zy = 105;
  // Body
  ctx.fillStyle = '#2a1040';
  ctx.fillRect(zx - 12, zy - 30, 24, 40);
  // Head
  ctx.beginPath();
  ctx.arc(zx, zy - 36, 10, 0, Math.PI * 2);
  ctx.fill();
  // Arms reaching forward
  ctx.fillRect(zx - 22, zy - 20, 12, 6);
  ctx.fillRect(zx + 10, zy - 18, 12, 6);
  // Glowing red eyes
  ctx.fillStyle = '#ff0000';
  ctx.shadowColor = '#ff0000';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(zx - 4, zy - 38, 2, 0, Math.PI * 2);
  ctx.arc(zx + 4, zy - 38, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Sword in foreground (player weapon)
  ctx.save();
  ctx.translate(W * 0.7, H - 100);
  ctx.rotate(-0.3);
  // Blade
  ctx.fillStyle = '#aaa';
  ctx.fillRect(-3, -55, 6, 45);
  // Crossguard
  ctx.fillStyle = '#aa8800';
  ctx.fillRect(-10, -12, 20, 4);
  // Handle
  ctx.fillStyle = '#553300';
  ctx.fillRect(-3, -10, 6, 14);
  ctx.restore();

  // Purple corruption glow
  var corruptGrad = ctx.createRadialGradient(W/2, H/2, 20, W/2, H/2, 130);
  corruptGrad.addColorStop(0, 'rgba(180, 77, 255, 0.1)');
  corruptGrad.addColorStop(1, 'rgba(180, 77, 255, 0)');
  ctx.fillStyle = corruptGrad;
  ctx.fillRect(0, 0, W, H);

  // Title text
  ctx.shadowColor = '#b44dff';
  ctx.shadowBlur = 12;
  ctx.font = 'bold 14px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText('CORRUPTED', W / 2, H - 28);
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Rating badge
  ctx.fillStyle = '#b44dff';
  ctx.font = 'bold 10px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('E', 12, 26);
  ctx.strokeStyle = '#b44dff';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(6, 12, 20, 20);
})();

// Draw the Az's Cipher cover art
(function () {
  var canvas = document.getElementById('cipherCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;

  // Background
  var bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#05050f');
  bg.addColorStop(1, '#0a0a18');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Scattered cipher letters in background
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ctx.font = 'bold 11px Courier New';
  for (var i = 0; i < 40; i++) {
    var x = 8 + (i % 8) * 26 + (Math.floor(i / 8) % 2) * 12;
    var y = 18 + Math.floor(i / 8) * 22;
    var opacity = 0.08 + (i % 5) * 0.04;
    ctx.fillStyle = 'rgba(204,136,68,' + opacity + ')';
    ctx.textAlign = 'center';
    ctx.fillText(alpha[i % 26], x, y);
  }

  // Padlock body
  var lx = W / 2, ly = H / 2 + 10;
  // Shackle (arc)
  ctx.beginPath();
  ctx.arc(lx, ly - 28, 22, Math.PI, 0, false);
  ctx.strokeStyle = '#cc8844';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Lock body
  ctx.beginPath();
  var bw = 52, bh = 42, br = 6;
  var bx = lx - bw / 2, by = ly - 10;
  ctx.moveTo(bx + br, by);
  ctx.lineTo(bx + bw - br, by);
  ctx.arcTo(bx + bw, by, bx + bw, by + br, br);
  ctx.lineTo(bx + bw, by + bh - br);
  ctx.arcTo(bx + bw, by + bh, bx + bw - br, by + bh, br);
  ctx.lineTo(bx + br, by + bh);
  ctx.arcTo(bx, by + bh, bx, by + bh - br, br);
  ctx.lineTo(bx, by + br);
  ctx.arcTo(bx, by, bx + br, by, br);
  ctx.closePath();
  ctx.fillStyle = '#1a1200';
  ctx.fill();
  ctx.strokeStyle = '#cc8844';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Keyhole
  ctx.beginPath();
  ctx.arc(lx, by + 16, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#cc8844';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(lx - 5, by + 22);
  ctx.lineTo(lx + 5, by + 22);
  ctx.lineTo(lx + 3, by + 34);
  ctx.lineTo(lx - 3, by + 34);
  ctx.closePath();
  ctx.fill();

  // Glow around lock
  ctx.shadowColor = '#cc8844';
  ctx.shadowBlur = 18;
  ctx.strokeStyle = '#cc884455';
  ctx.lineWidth = 1;
  ctx.strokeRect(bx - 4, by - 4, bw + 8, bh + 8);
  ctx.shadowBlur = 0;

  // Title
  ctx.fillStyle = '#00ff88';
  ctx.font = 'bold 13px Courier New';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#00ff88';
  ctx.shadowBlur = 8;
  ctx.fillText("CIPHER", W / 2, H - 36);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#334455';
  ctx.font = '9px Courier New';
  ctx.fillText('CRACK THE CODE', W / 2, H - 20);
})();

// Draw the Trivia cover art on the canvas
(function () {
  var canvas = document.getElementById('triviaCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  // Dark game show background
  var bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#080818');
  bg.addColorStop(0.5, '#0d0d24');
  bg.addColorStop(1, '#080818');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Spotlight rays from centre top
  ctx.save();
  var rayColours = ['rgba(255,220,50,0.04)', 'rgba(255,100,200,0.04)', 'rgba(50,220,255,0.04)', 'rgba(100,255,150,0.04)'];
  for (var r = 0; r < 8; r++) {
    var rayAngle = (r / 8) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.38);
    ctx.lineTo(
      W / 2 + Math.cos(rayAngle - 0.15) * 200,
      H * 0.38 + Math.sin(rayAngle - 0.15) * 200
    );
    ctx.lineTo(
      W / 2 + Math.cos(rayAngle + 0.15) * 200,
      H * 0.38 + Math.sin(rayAngle + 0.15) * 200
    );
    ctx.closePath();
    ctx.fillStyle = rayColours[r % rayColours.length];
    ctx.fill();
  }
  ctx.restore();

  // Outer glow ring
  var outerGlow = ctx.createRadialGradient(W / 2, H * 0.38, 30, W / 2, H * 0.38, 80);
  outerGlow.addColorStop(0, 'rgba(255, 220, 50, 0.18)');
  outerGlow.addColorStop(0.5, 'rgba(255, 100, 200, 0.10)');
  outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(W / 2, H * 0.38, 80, 0, Math.PI * 2);
  ctx.fill();

  // Big glowing "?" in the centre
  ctx.save();
  ctx.shadowColor = '#ffe44d';
  ctx.shadowBlur = 30;
  ctx.font = 'bold 96px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Rainbow gradient on the "?"
  var qGrad = ctx.createLinearGradient(W / 2 - 40, H * 0.25, W / 2 + 40, H * 0.5);
  qGrad.addColorStop(0, '#ff6ec7');
  qGrad.addColorStop(0.5, '#00ffc8');
  qGrad.addColorStop(1, '#ffe44d');
  ctx.fillStyle = qGrad;
  ctx.fillText('?', W / 2, H * 0.38);
  ctx.restore();

  // Four player buzzer circles at the bottom
  var buzzers = [
    { x: W * 0.18, colour: '#ff4444', label: '1' },
    { x: W * 0.40, colour: '#4488ff', label: '2' },
    { x: W * 0.62, colour: '#ffaa22', label: '3' },
    { x: W * 0.84, colour: '#44dd66', label: '4' }
  ];
  var buzzerY = H - 72;

  buzzers.forEach(function (b) {
    // Glow
    ctx.beginPath();
    ctx.arc(b.x, buzzerY, 22, 0, Math.PI * 2);
    ctx.fillStyle = b.colour.replace(')', ', 0.25)').replace('rgb', 'rgba');
    ctx.shadowColor = b.colour;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Circle
    ctx.beginPath();
    ctx.arc(b.x, buzzerY, 16, 0, Math.PI * 2);
    ctx.fillStyle = b.colour;
    ctx.fill();

    // Highlight
    ctx.beginPath();
    ctx.arc(b.x - 4, buzzerY - 5, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fill();

    // Player number
    ctx.font = 'bold 10px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.fillText(b.label, b.x, buzzerY);
  });

  // Title text
  ctx.shadowColor = '#ff6ec7';
  ctx.shadowBlur = 12;
  ctx.font = 'bold 14px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#fff';
  ctx.fillText('TRIVIA', W / 2, H - 28);
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Rating badge
  ctx.fillStyle = '#ffe44d';
  ctx.font = 'bold 10px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('E', 12, 26);
  ctx.strokeStyle = '#ffe44d';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(6, 12, 20, 20);
})();

// Draw the Spotlight cover art on the canvas
(function () {
  var canvas = document.getElementById('spotlightCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  // Stage backdrop — deep curtain
  var bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0a0610');
  bg.addColorStop(0.5, '#1a0820');
  bg.addColorStop(1, '#0a0610');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Spotlight cone from top centre
  var coneTopX = W / 2;
  var coneTopY = -10;
  var coneBaseY = H * 0.72;
  var coneHalfWidth = W * 0.46;
  var cone = ctx.createLinearGradient(coneTopX, coneTopY, coneTopX, coneBaseY);
  cone.addColorStop(0, 'rgba(255, 220, 80, 0.55)');
  cone.addColorStop(0.5, 'rgba(255, 200, 60, 0.18)');
  cone.addColorStop(1, 'rgba(255, 200, 60, 0)');
  ctx.fillStyle = cone;
  ctx.beginPath();
  ctx.moveTo(coneTopX - 14, coneTopY);
  ctx.lineTo(coneTopX + 14, coneTopY);
  ctx.lineTo(coneTopX + coneHalfWidth, coneBaseY);
  ctx.lineTo(coneTopX - coneHalfWidth, coneBaseY);
  ctx.closePath();
  ctx.fill();

  // Lamp at top
  ctx.save();
  ctx.shadowColor = '#ffd84d';
  ctx.shadowBlur = 22;
  var lampGrad = ctx.createRadialGradient(coneTopX, 8, 2, coneTopX, 8, 16);
  lampGrad.addColorStop(0, '#fff6b0');
  lampGrad.addColorStop(0.6, '#ffd84d');
  lampGrad.addColorStop(1, '#cc8a00');
  ctx.fillStyle = lampGrad;
  ctx.beginPath();
  ctx.arc(coneTopX, 8, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Floor glow where the spotlight lands
  var floor = ctx.createRadialGradient(W / 2, coneBaseY + 6, 6, W / 2, coneBaseY + 6, coneHalfWidth);
  floor.addColorStop(0, 'rgba(255, 220, 80, 0.4)');
  floor.addColorStop(1, 'rgba(255, 220, 80, 0)');
  ctx.fillStyle = floor;
  ctx.beginPath();
  ctx.ellipse(W / 2, coneBaseY + 6, coneHalfWidth, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Star at centre stage
  function drawStar(cx, cy, outer, inner, points, fill, glow) {
    ctx.save();
    if (glow) { ctx.shadowColor = glow; ctx.shadowBlur = 24; }
    ctx.beginPath();
    var rot = -Math.PI / 2;
    var step = Math.PI / points;
    ctx.moveTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
    for (var i = 0; i < points; i++) {
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.restore();
  }

  var starX = W / 2;
  var starY = H * 0.46;
  drawStar(starX, starY, 56, 24, 5, '#ffd84d', '#ffd84d');
  drawStar(starX, starY, 38, 15, 5, '#fff6b0');

  // Audience silhouettes
  var audience = [
    { x: W * 0.18, y: H - 56, scale: 1.0 },
    { x: W * 0.82, y: H - 56, scale: 1.0 },
    { x: W * 0.5,  y: H - 50, scale: 1.15 }
  ];
  audience.forEach(function (a) {
    ctx.save();
    ctx.fillStyle = '#000814';
    ctx.shadowColor = 'rgba(255, 220, 80, 0.4)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(a.x, a.y - 18 * a.scale, 9 * a.scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(a.x - 20 * a.scale, H - 28);
    ctx.quadraticCurveTo(a.x, a.y - 8 * a.scale, a.x + 20 * a.scale, H - 28);
    ctx.lineTo(a.x - 20 * a.scale, H - 28);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  // Title
  ctx.save();
  ctx.shadowColor = '#ffd84d';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#fff6b0';
  ctx.font = 'bold 18px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SPOTLIGHT', W / 2, H - 22);
  ctx.restore();

  // Tagline
  ctx.fillStyle = '#cc9933';
  ctx.font = '8px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('YOUR TURN TO SHINE', W / 2, H - 8);
})();

// Draw the Treasure Hunt cover art
(function () {
  var canvas = document.getElementById('treasureCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  // Velvet backdrop
  var bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#08081a');
  bg.addColorStop(0.6, '#1a0d2c');
  bg.addColorStop(1, '#08081a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle gold radial glow behind cards
  var glow = ctx.createRadialGradient(W / 2, H * 0.42, 10, W / 2, H * 0.42, W * 0.55);
  glow.addColorStop(0, 'rgba(255, 200, 60, 0.22)');
  glow.addColorStop(1, 'rgba(255, 200, 60, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Three fanned cards — yellow, red, blue
  var cards = [
    { x: W / 2 - 56, y: H * 0.28, rot: -0.34, fill: '#ffe9b0', border: '#caa14a', value: 7,  colour: '#bf7d12', suit: '♦' },
    { x: W / 2,      y: H * 0.22, rot: 0,     fill: '#ffd9dc', border: '#a93140', value: 13, colour: '#7a1228', suit: '♥' },
    { x: W / 2 + 56, y: H * 0.28, rot: 0.34,  fill: '#d6dcff', border: '#3742a8', value: 9,  colour: '#1a2070', suit: '♠' }
  ];
  cards.forEach(function (card) {
    ctx.save();
    ctx.translate(card.x, card.y);
    ctx.rotate(card.rot);

    // shadow
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 6;

    // body
    var grad = ctx.createLinearGradient(0, -76, 0, 76);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(1, card.fill);
    ctx.fillStyle = grad;
    ctx.strokeStyle = card.border;
    ctx.lineWidth = 3;
    roundRect(ctx, -52, -76, 104, 152, 14);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // top corner number + suit
    ctx.fillStyle = card.colour;
    ctx.font = 'bold 18px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(String(card.value), -42, -64);
    ctx.font = 'bold 16px serif';
    ctx.fillText(card.suit, -42, -42);

    // big centre number
    ctx.font = 'bold 56px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(card.value), 0, 0);

    // bottom corner (rotated)
    ctx.save();
    ctx.translate(42, 64);
    ctx.rotate(Math.PI);
    ctx.font = 'bold 18px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(String(card.value), 0, 0);
    ctx.font = 'bold 16px serif';
    ctx.fillText(card.suit, 0, 22);
    ctx.restore();

    ctx.restore();
  });

  // Treasure pile — a row of coins below the cards
  ctx.save();
  var coinY = H * 0.7;
  var coins = [-44, -22, 0, 22, 44, -33, -11, 11, 33];
  coins.forEach(function (dx, i) {
    var cy = coinY + (i < 5 ? 0 : -10);
    var cx = W / 2 + dx;
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    var coinGrad = ctx.createRadialGradient(cx - 3, cy - 3, 1, cx, cy, 12);
    coinGrad.addColorStop(0, '#fff2b3');
    coinGrad.addColorStop(0.5, '#ffd84d');
    coinGrad.addColorStop(1, '#a37a00');
    ctx.fillStyle = coinGrad;
    ctx.shadowColor = 'rgba(255,200,60,0.4)';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#7a5800';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#7a5800';
    ctx.font = 'bold 9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', cx, cy);
  });
  ctx.restore();

  // Title
  ctx.save();
  ctx.shadowColor = '#ffd84d';
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#fff2b3';
  ctx.font = 'bold 16px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TREASURE', W / 2, H - 30);
  ctx.fillText('HUNT', W / 2, H - 10);
  ctx.restore();

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
})();

// ── Hacker Pro cover ──────────────────────────────────────────────────────
(function () {
  var canvas = document.getElementById('hackerCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  // CRT-black background with green tint
  var bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#020806');
  bg.addColorStop(0.5, '#062012');
  bg.addColorStop(1, '#020806');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Faint scanlines
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#00ff66';
  for (var y = 0; y < H; y += 4) {
    ctx.fillRect(0, y, W, 1);
  }
  ctx.restore();

  // Glow halo behind slots
  var glow = ctx.createRadialGradient(W / 2, H * 0.5, 8, W / 2, H * 0.5, W * 0.6);
  glow.addColorStop(0, 'rgba(0, 255, 102, 0.28)');
  glow.addColorStop(1, 'rgba(0, 255, 102, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Code slots: █ █ ✓ █  (one cracked)
  ctx.font = 'bold 38px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  var slotW = 36;
  var slotH = 50;
  var gap = 10;
  var totalW = 4 * slotW + 3 * gap;
  var startX = (W - totalW) / 2 + slotW / 2;
  var slotY = H * 0.46;
  var values = ['█', '7', '█', '█'];
  var locked = [false, true, false, false];

  for (var i = 0; i < 4; i++) {
    var cx = startX + i * (slotW + gap);
    ctx.save();
    ctx.shadowColor = locked[i] ? '#00ff66' : 'transparent';
    ctx.shadowBlur = locked[i] ? 14 : 0;
    ctx.strokeStyle = locked[i] ? '#00ff66' : '#008833';
    ctx.lineWidth = 3;
    ctx.fillStyle = locked[i] ? 'rgba(0, 255, 102, 0.18)' : 'rgba(0, 255, 102, 0.04)';
    ctx.beginPath();
    ctx.rect(cx - slotW / 2, slotY - slotH / 2, slotW, slotH);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = locked[i] ? '#aaffcc' : '#00ff66';
    ctx.fillText(values[i], cx, slotY + 2);
    ctx.restore();
  }

  // Top status line
  ctx.fillStyle = '#ffb300';
  ctx.font = 'bold 11px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('> ATTEMPTS: 042', 14, 28);

  // Bottom title
  ctx.save();
  ctx.shadowColor = '#00ff66';
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#aaffcc';
  ctx.font = 'bold 16px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HACKER', W / 2, H - 30);
  ctx.fillText('PRO', W / 2, H - 10);
  ctx.restore();

  // Blinking cursor accent in the corner
  ctx.fillStyle = '#00ff66';
  ctx.fillRect(W - 22, H - 24, 8, 12);
})();

// ── Boomerang Brawl cover ─────────────────────────────────────────────────
(function () {
  var canvas = document.getElementById('boomerangCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  // Sunset-arena background
  var bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#180a14');
  bg.addColorStop(0.55, '#3a1408');
  bg.addColorStop(1, '#080414');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Floor grid lines (top-down vibe)
  ctx.strokeStyle = 'rgba(255,136,0,0.16)';
  ctx.lineWidth = 1;
  for (var gx = 22; gx < W; gx += 22) {
    ctx.beginPath(); ctx.moveTo(gx, 50); ctx.lineTo(gx, H - 60); ctx.stroke();
  }
  for (var gy = 56; gy < H - 60; gy += 22) {
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
  }

  // Glow halo behind centre
  var glow = ctx.createRadialGradient(W / 2, H * 0.5, 8, W / 2, H * 0.5, W * 0.6);
  glow.addColorStop(0, 'rgba(255, 136, 0, 0.28)');
  glow.addColorStop(1, 'rgba(255, 136, 0, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Two boomerangs arcing across
  function rang(cx, cy, rot, color) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.shadowColor = color; ctx.shadowBlur = 14;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-20, -3); ctx.lineTo(0, -16); ctx.lineTo(20, -3);
    ctx.lineTo(4, 0);
    ctx.lineTo(20, 20); ctx.lineTo(0, 10); ctx.lineTo(-20, 20);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Trail
  ctx.strokeStyle = 'rgba(255,136,0,0.45)';
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(W * 0.18, H * 0.78);
  ctx.bezierCurveTo(W * 0.2, H * 0.4, W * 0.55, H * 0.25, W * 0.78, H * 0.55);
  ctx.stroke();
  ctx.setLineDash([]);

  rang(W * 0.32, H * 0.34, -0.6, '#ff8800');
  rang(W * 0.66, H * 0.55, 0.8, '#3742fa');

  // Player avatars (corner spawns)
  function avatar(cx, cy, color) {
    ctx.save();
    ctx.shadowColor = color; ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  avatar(38, 60, '#ff4757');
  avatar(W - 36, H - 70, '#2ed573');

  // Title
  ctx.save();
  ctx.shadowColor = '#ff8800';
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 16px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BOOMERANG', W / 2, H - 32);
  ctx.fillStyle = '#ff8800';
  ctx.fillText('BRAWL', W / 2, H - 12);
  ctx.restore();
})();

// ── Letterbox cover ────────────────────────────────────────────────
(function () {
  var canvas = document.getElementById('letterboxCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  ctx.fillStyle = '#8dd66a';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  for (var i = 0; i < 80; i++) ctx.fillRect((i * 37) % W, (i * 53) % H, 2, 2);

  ctx.fillStyle = '#cfcfcf';
  ctx.fillRect(70, 0, 14, H);
  ctx.fillRect(136, 0, 14, H);

  ctx.fillStyle = '#3a3a44';
  ctx.fillRect(84, 0, 52, H);
  ctx.fillStyle = '#ffe44d';
  for (var y = 8; y < H; y += 24) ctx.fillRect(108, y, 4, 14);

  function roof(x, y, w, h, c1, c2) {
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x + 4, y + 4, w, h);
    ctx.fillStyle = c1; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = c2; ctx.fillRect(x, y + h / 2 - 2, w, 4);
  }
  roof(4, 20, 56, 44, '#9a4a2a', '#6a2818');
  roof(156, 20, 54, 44, '#3f6e8a', '#244555');
  roof(4, 140, 56, 44, '#7a2828', '#5a1818');
  roof(156, 140, 54, 44, '#5a7a3a', '#385020');

  function tree(x, y) {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(x + 4, y + 4, 12, 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3a7a3a';
    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4ea84e';
    ctx.beginPath(); ctx.arc(x - 2, y - 2, 8, 0, Math.PI * 2); ctx.fill();
  }
  tree(50, 100); tree(170, 105); tree(45, 220);

  function lbox(x, y, hit) {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(x + 2, y + 4, 8, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#5a3018'; ctx.fillRect(x - 1, y - 1, 2, 6);
    ctx.fillStyle = hit ? '#2a8a3a' : '#d63f3f'; ctx.fillRect(x - 8, y - 8, 16, 10);
    ctx.fillStyle = hit ? '#1f6628' : '#a02828'; ctx.fillRect(x - 8, y - 8, 16, 2);
    ctx.fillStyle = '#ffe44d';
    ctx.beginPath();
    ctx.moveTo(x + 7, y - 8); ctx.lineTo(x + 13, y - 6); ctx.lineTo(x + 7, y - 4);
    ctx.closePath(); ctx.fill();
  }
  lbox(72, 50, false); lbox(148, 56, true);
  lbox(72, 174, false); lbox(148, 174, false);

  ctx.save();
  ctx.translate(110, 130);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath(); ctx.ellipse(2, 2, 16, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d63f3f'; ctx.fillRect(-12, -3, 24, 6);
  ctx.fillStyle = '#222'; ctx.fillRect(-16, -2, 6, 4); ctx.fillRect(10, -2, 6, 4);
  ctx.fillStyle = '#4ea84e';
  ctx.beginPath(); ctx.ellipse(-1, 0, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#3a8a3a';
  ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-15, -3); ctx.lineTo(-15, 3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#4ea84e';
  ctx.beginPath(); ctx.arc(6, 0, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#3a8a3a'; ctx.fillRect(8, -3, 6, 6);
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(8, -3, 1.4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.arc(8.4, -3, 0.7, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.setLineDash([2, 3]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(110, 130);
  ctx.bezierCurveTo(130, 110, 145, 80, 148, 60);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath(); ctx.ellipse(140, 88, 4, 2, 0, 0, Math.PI * 2); ctx.fill();
  ctx.save();
  ctx.translate(138, 80); ctx.rotate(0.3);
  ctx.fillStyle = '#fff'; ctx.fillRect(-6, -4, 12, 8);
  ctx.strokeStyle = '#aaa'; ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-4, -2); ctx.lineTo(4, -2);
  ctx.moveTo(-4, 0);  ctx.lineTo(4, 0);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, H - 38, W, 38);
  ctx.fillStyle = '#d63f3f';
  ctx.shadowColor = '#ffd24d';
  ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 2;
  ctx.font = 'bold 18px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('LETTERBOX', W / 2, H - 14);
  ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;

  ctx.fillStyle = '#2a8a3a';
  ctx.font = 'bold 10px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('E', 12, 26);
  ctx.strokeStyle = '#2a8a3a';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(6, 12, 20, 20);
})();

// ── Magnet Lab cover ──────────────────────────────────────────────────────
(function () {
  var canvas = document.getElementById('magnetLabCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  var bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#020610');
  bg.addColorStop(0.5, '#050f20');
  bg.addColorStop(1, '#020610');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Magnetic field rings
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = '#00ccff';
  ctx.lineWidth = 1;
  for (var ring = 30; ring < 120; ring += 20) {
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, ring, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // Lab grid
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.strokeStyle = '#0088cc';
  ctx.lineWidth = 1;
  for (var gx = 30; gx < W; gx += 22) {
    ctx.beginPath(); ctx.moveTo(gx, 50); ctx.lineTo(gx, H - 60); ctx.stroke();
  }
  for (var gy = 56; gy < H - 60; gy += 22) {
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = '#244';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 50, W - 4, H - 110);

  function magnet(cx, cy, color, label) {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, 14, Math.PI * 0.15, Math.PI * 0.85, true);
    ctx.lineTo(cx + 12, cy - 4);
    ctx.arc(cx, cy, 8, Math.PI * 0.85, Math.PI * 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(label, cx, cy + 14);
    ctx.restore();
  }
  magnet(60, H * 0.42, '#00ccff', 'PULL');
  magnet(W - 60, H * 0.55, '#ff4477', 'PUSH');

  // Energy ball trajectory
  ctx.save();
  ctx.strokeStyle = 'rgba(255,238,80,0.35)';
  ctx.lineWidth = 3;
  ctx.setLineDash([5, 6]);
  ctx.beginPath();
  ctx.moveTo(W * 0.18, H * 0.65);
  ctx.bezierCurveTo(W * 0.35, H * 0.30, W * 0.65, H * 0.72, W * 0.82, H * 0.45);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // Energy ball
  ctx.save();
  ctx.shadowColor = '#ffee50';
  ctx.shadowBlur = 22;
  var ballGrad = ctx.createRadialGradient(W * 0.50, H * 0.50, 2, W * 0.50, H * 0.50, 12);
  ballGrad.addColorStop(0, '#ffffff');
  ballGrad.addColorStop(0.6, '#ffee50');
  ballGrad.addColorStop(1, '#ff8800');
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(W * 0.50, H * 0.50, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Target bullseye
  ctx.save();
  var bx = W * 0.80, by = H * 0.40;
  ['#ff4477', '#ffffff', '#ff4477', '#ffffff', '#ffee50'].forEach(function (c, i, arr) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(bx, by, (arr.length - i) * 4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // Player cursors
  function cursor(cx, cy, color, rotated) {
    ctx.save();
    ctx.translate(cx, cy);
    if (rotated) ctx.rotate(Math.PI);
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-12, 0); ctx.lineTo(-5, 0);
    ctx.moveTo(5, 0); ctx.lineTo(12, 0);
    ctx.moveTo(0, -12); ctx.lineTo(0, -5);
    ctx.moveTo(0, 5); ctx.lineTo(0, 12);
    ctx.stroke();
    ctx.restore();
  }
  cursor(W * 0.30, H - 80, '#00ccff', false);
  cursor(W * 0.70, 80, '#ff4477', true);

  // Title
  ctx.save();
  ctx.shadowColor = '#00ccff';
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#aaeeff';
  ctx.font = 'bold 16px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MAGNET', W / 2, H - 32);
  ctx.fillStyle = '#ff77aa';
  ctx.fillText('LAB', W / 2, H - 12);
  ctx.restore();
})();

// ── Marble Run cover ──────────────────────────────────────────────────────────
(function () {
  var canvas = document.getElementById('marbleRunCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;

  var bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#050a14');
  bg.addColorStop(0.5, '#0a1020');
  bg.addColorStop(1, '#050a14');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  function drawPipe(x0, y0, x1, y1) {
    var tw = 18;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
    ctx.strokeStyle = '#0d1520'; ctx.lineWidth = tw + 4; ctx.lineCap = 'round'; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
    ctx.strokeStyle = '#1e2d42'; ctx.lineWidth = tw; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
    ctx.strokeStyle = '#131f30'; ctx.lineWidth = tw * 0.55; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
    ctx.strokeStyle = 'rgba(100,160,220,0.15)'; ctx.lineWidth = tw * 0.15; ctx.stroke();
  }

  drawPipe(W*0.50, H*0.06, W*0.50, H*0.16);
  drawPipe(W*0.50, H*0.16, W*0.14, H*0.30);
  drawPipe(W*0.14, H*0.30, W*0.86, H*0.46);
  drawPipe(W*0.86, H*0.46, W*0.14, H*0.62);
  drawPipe(W*0.14, H*0.62, W*0.86, H*0.78);
  drawPipe(W*0.86, H*0.78, W*0.50, H*0.93);

  var fw = 22;
  for (var row = 0; row < 2; row++) {
    for (var col = 0; col < 4; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? '#fff' : '#111';
      ctx.fillRect(W*0.50 - fw + col*(fw/2), H*0.93 - fw/4 + row*(fw/4), fw/2, fw/4);
    }
  }

  var marbleData = [
    { t: 0.12, color: '#ff4757' }, { t: 0.20, color: '#3742fa' },
    { t: 0.35, color: '#2ed573' }, { t: 0.50, color: '#ffd700' },
    { t: 0.65, color: '#a855f7' }, { t: 0.80, color: '#ff6b9d' }
  ];

  function getPos(t) {
    var rawPts = [
      [W*0.50, H*0.06], [W*0.50, H*0.16], [W*0.14, H*0.30],
      [W*0.86, H*0.46], [W*0.14, H*0.62], [W*0.86, H*0.78], [W*0.50, H*0.93]
    ];
    var segs = [], total = 0;
    for (var i = 0; i < rawPts.length - 1; i++) {
      var dx = rawPts[i+1][0]-rawPts[i][0], dy = rawPts[i+1][1]-rawPts[i][1];
      var l = Math.sqrt(dx*dx+dy*dy); segs.push(l); total += l;
    }
    var target = t * total, cum = 0;
    for (var j = 0; j < segs.length; j++) {
      if (target <= cum + segs[j]) {
        var frac = (target - cum) / segs[j];
        return { x: rawPts[j][0]+(rawPts[j+1][0]-rawPts[j][0])*frac, y: rawPts[j][1]+(rawPts[j+1][1]-rawPts[j][1])*frac };
      }
      cum += segs[j];
    }
    return { x: rawPts[rawPts.length-1][0], y: rawPts[rawPts.length-1][1] };
  }

  marbleData.forEach(function (m) {
    var p = getPos(m.t), r = 7;
    var grad = ctx.createRadialGradient(p.x-r*0.3, p.y-r*0.3, 1, p.x, p.y, r);
    var hex = m.color.replace('#','');
    var rr = parseInt(hex.slice(0,2),16), gg = parseInt(hex.slice(2,4),16), bb = parseInt(hex.slice(4,6),16);
    grad.addColorStop(0, 'rgb('+Math.min(255,rr+80)+','+Math.min(255,gg+80)+','+Math.min(255,bb+80)+')');
    grad.addColorStop(0.6, m.color);
    grad.addColorStop(1, 'rgb('+Math.max(0,rr-60)+','+Math.max(0,gg-60)+','+Math.max(0,bb-60)+')');
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI*2); ctx.fillStyle = grad; ctx.fill();
    ctx.beginPath(); ctx.arc(p.x-r*0.28, p.y-r*0.28, r*0.28, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill();
  });

  ctx.save();
  ctx.translate(W*0.50, H*0.55);
  ctx.shadowColor = '#ffd700'; ctx.shadowBlur = 12;
  ctx.beginPath(); ctx.moveTo(0,-9); ctx.lineTo(9,0); ctx.lineTo(0,9); ctx.lineTo(-9,0);
  ctx.closePath(); ctx.fillStyle = '#ffd700'; ctx.fill();
  ctx.restore(); ctx.shadowBlur = 0;

  ctx.font = 'bold 12px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#00d2ff';
  ctx.shadowColor = '#00d2ff'; ctx.shadowBlur = 8;
  ctx.fillText('MARBLE RUN', W/2, H-22);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#334';
  ctx.font = '9px "Courier New", monospace';
  ctx.fillText('UP TO 20 PLAYERS', W/2, H-8);
})();

// ── Dino Jump cover ───────────────────────────────────────────────────────────
(function () {
  var canvas = document.getElementById('dinoJumpCover');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height; // 220 x 280

  var TITLE_H = 44;
  var GAME_H  = H - TITLE_H;
  var QW = W / 2, QH = GAME_H / 2;

  // Dark base
  ctx.fillStyle = '#050810';
  ctx.fillRect(0, 0, W, H);

  // Quadrant tints (visible but subtle)
  var tints = [
    'rgba(160,160,160,0.18)',
    'rgba(0,255,204,0.12)',
    'rgba(68,204,102,0.12)',
    'rgba(170,136,255,0.12)'
  ];
  ctx.fillStyle = tints[0]; ctx.fillRect(0,   0,   QW, QH);
  ctx.fillStyle = tints[1]; ctx.fillRect(QW,  0,   QW, QH);
  ctx.fillStyle = tints[2]; ctx.fillRect(0,   QH,  QW, QH);
  ctx.fillStyle = tints[3]; ctx.fillRect(QW,  QH,  QW, QH);

  // Dividers
  ctx.fillStyle = '#000';
  ctx.fillRect(QW - 1, 0, 2, GAME_H);
  ctx.fillRect(0, QH - 1, W, 2);

  // Platforms per quadrant (relative to quadrant top-left)
  var plats = [
    { ox: 0,  oy: 0,  rows: [[8, QH*0.55, 46], [30, QH*0.75, 38]] },
    { ox: QW, oy: 0,  rows: [[6, QH*0.45, 44], [24, QH*0.70, 40]] },
    { ox: 0,  oy: QH, rows: [[10, QH*0.50, 42], [28, QH*0.72, 38]] },
    { ox: QW, oy: QH, rows: [[8, QH*0.48, 46], [22, QH*0.68, 40]] }
  ];
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  plats.forEach(function(q) {
    q.rows.forEach(function(r) {
      ctx.fillRect(q.ox + r[0], q.oy + r[1], r[2], 4);
    });
  });

  // Characters -- one per quadrant, mid-jump above lower platform
  var chars = [
    { cx: QW*0.42,  cy: QH*0.38,  col: '#b0b0b0', hl: '#e0e0e0' },
    { cx: QW*1.42,  cy: QH*0.30,  col: '#00ffcc', hl: '#88ffee' },
    { cx: QW*0.42,  cy: QH*1.38,  col: '#44cc66', hl: '#88ff88' },
    { cx: QW*1.42,  cy: QH*1.32,  col: '#aa88ff', hl: '#ddbbff' }
  ];
  chars.forEach(function(c) {
    ctx.save();
    ctx.shadowColor = c.col;
    ctx.shadowBlur = 10;
    ctx.fillStyle = c.col;
    ctx.fillRect(c.cx - 11, c.cy - 5, 22, 11);  // body
    ctx.fillStyle = c.hl;
    ctx.fillRect(c.cx + 3,  c.cy - 15, 10, 11); // head
    ctx.fillStyle = '#000';
    ctx.fillRect(c.cx + 9,  c.cy - 12, 3, 3);   // eye
    ctx.restore();
  });

  // Jump arcs (dashed upward curves behind each character)
  var arcDefs = [
    { x: QW*0.42,  y: QH*0.55,  col: 'rgba(160,160,160,0.4)' },
    { x: QW*1.42,  y: QH*0.45,  col: 'rgba(0,255,204,0.35)' },
    { x: QW*0.42,  y: QH*1.50,  col: 'rgba(68,204,102,0.35)' },
    { x: QW*1.42,  y: QH*1.48,  col: 'rgba(170,136,255,0.35)' }
  ];
  arcDefs.forEach(function(a) {
    ctx.save();
    ctx.strokeStyle = a.col;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(a.x - 14, a.y);
    ctx.quadraticCurveTo(a.x, a.y - 32, a.x + 14, a.y);
    ctx.stroke();
    ctx.restore();
  });

  // Name labels in corner of each quadrant
  var labels = [
    { x: 5,       y: 12,       text: 'SLATE', col: '#b0b0b0' },
    { x: QW + 5,  y: 12,       text: 'PIXEL', col: '#00ffcc' },
    { x: 5,       y: QH + 12,  text: 'FERN',  col: '#44cc66' },
    { x: QW + 5,  y: QH + 12,  text: 'ECHO',  col: '#aa88ff' }
  ];
  labels.forEach(function(l) {
    ctx.fillStyle = l.col;
    ctx.font = 'bold 7px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(l.text, l.x, l.y);
  });

  // Title bar
  ctx.fillStyle = '#0d1020';
  ctx.fillRect(0, GAME_H, W, TITLE_H);
  ctx.fillStyle = 'rgba(255,228,77,0.12)';
  ctx.fillRect(0, GAME_H, W, 2);

  ctx.save();
  ctx.shadowColor = '#ffe44d';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#ffe44d';
  ctx.font = 'bold 15px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DINO JUMP', W / 2, GAME_H + TITLE_H / 2);
  ctx.restore();
})();
