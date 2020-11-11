/* eslint-disable  */
let ANGLE = null;
let HALF = null;
const PHI = 0.5 * (-1.0 + Math.sqrt(5.0));
let SIZE = null;
let STEP = null;
let ___centroid; let ___delta; let ___distance; let ___length; let ___radians; let ___rotate; let ___scale; let ___translate; let __distanceAtAngle; let __resample; let __rotateToZero; let __scaleToSquare; let __translateToOrigin; let _binds; let _candidates; let _findBestMatch; let _hasBinds; let _options; let _templates; let
  _transform;

_options = {};

_templates = {};

_binds = {};

_hasBinds = false;

_candidates = [];

export default function OneDollar(options) {
  if (options == null) {
    options = {};
  }
  _options = options;
  if (!('score' in _options)) {
    _options.score = 80;
  }
  if (!('parts' in _options)) {
    _options.parts = 64;
  }
  if (!('angle' in _options)) {
    _options.angle = 45;
  }
  ANGLE = ___radians(_options.angle);
  if (!('step' in _options)) {
    _options.step = 2;
  }
  STEP = ___radians(_options.step);
  if (!('size' in _options)) {
    _options.size = 250.0;
  }
  SIZE = _options.size;
  HALF = 0.5 * Math.sqrt(SIZE * SIZE + SIZE * SIZE);
  return this;
}

OneDollar.prototype.add = function (name, points) {
  if (points.length > 0) {
    _templates[name] = _transform(points);
  }
  return this;
};

OneDollar.prototype.remove = function (name) {
  if (_templates[name] !== void 0) {
    delete _templates[name];
  }
  return this;
};

OneDollar.prototype.on = function (name, fn) {
  let i;
  let len;
  let names;
  let template;
  names = [];
  if (name === '*') {
    for (name in _templates) {
      template = _templates[name];
      names.push(name);
    }
  } else {
    names = name.split(' ');
  }
  for (i = 0, len = names.length; i < len; i++) {
    name = names[i];
    if (_templates[name] !== void 0) {
      _binds[name] = fn;
      _hasBinds = true;
    } else {
      throw new Error(`The template '${name}' isn't defined.`);
    }
  }
  return this;
};

OneDollar.prototype.off = function (name) {
  let bind;
  if (_binds[name] !== void 0) {
    delete _binds[name];
    _hasBinds = false;
    for (name in _binds) {
      bind = _binds[name];
      if (_templates.hasOwnProperty(name)) {
        _hasBinds = true;
        break;
      }
    }
  }
  return this;
};

OneDollar.prototype.toObject = function () {
  return {
    options: _options,
    templates: _templates,
    binds: _binds,
  };
};

OneDollar.prototype.start = function (id, point) {
  if (typeof id === 'object' && typeof point === 'undefined') {
    point = id;
    id = -1;
  }
  _candidates[id] = [];
  this.update(id, point);
  return this;
};

OneDollar.prototype.update = function (id, point) {
  if (typeof id === 'object' && typeof point === 'undefined') {
    point = id;
    id = -1;
  }
  _candidates[id].push(point);
  return this;
};

OneDollar.prototype.end = function (id, point) {
  let result;
  if (typeof id === 'object' && typeof point === 'undefined') {
    point = id;
    id = -1;
  }
  this.update(id, point);
  result = this.check(_candidates[id]);
  delete _candidates[id];
  return result;
};

OneDollar.prototype.check = function (candidate) {
  let args;
  let bestDist;
  let bestName;
  let distance;
  let idx;
  let name;
  let path;
  let points;
  let ranking;
  let score;
  let template;
  args = false;
  points = candidate.length;
  if (points < 3) {
    return args;
  }
  path = {
    start: [candidate[0][0], candidate[0][1]],
    end: [candidate[points - 1][0], candidate[points - 1][1]],
    centroid: points > 1 ? ___centroid(candidate) : path.start,
  };
  candidate = _transform(candidate);
  ranking = [];
  bestDist = +Infinity;
  bestName = null;
  for (name in _templates) {
    template = _templates[name];
    if (_hasBinds === false || _binds[name] !== void 0) {
      distance = _findBestMatch(candidate, template);
      score = parseFloat(((1.0 - distance / HALF) * 100).toFixed(2));
      if (isNaN(score)) {
        score = 0.0;
      }
      ranking.push({
        name,
        score,
      });
      if (distance < bestDist) {
        bestDist = distance;
        bestName = name;
      }
    }
  }
  if (ranking.length > 0) {
    if (ranking.length > 1) {
      ranking.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        }
        return -1;
      });
    }
    idx = candidate.length - 1;
    args = {
      name: ranking[0].name,
      score: ranking[0].score,
      recognized: false,
      path,
      ranking,
    };
    if (ranking[0].score >= _options.score) {
      args.recognized = true;
      if (_hasBinds) {
        _binds[ranking[0].name].apply(this, [args]);
      }
    }
  }
  return args;
};

_transform = function (points) {
  points = __resample(points);
  points = __rotateToZero(points);
  points = __scaleToSquare(points);
  points = __translateToOrigin(points);
  return points;
};

_findBestMatch = function (candidate, template) {
  let centroid;
  let f1;
  let f2;
  let lt;
  let rt;
  let x1;
  let x2;
  rt = ANGLE;
  lt = -ANGLE;
  centroid = ___centroid(candidate);
  x1 = PHI * lt + (1.0 - PHI) * rt;
  f1 = __distanceAtAngle(candidate, template, x1, centroid);
  x2 = (1.0 - PHI) * lt + PHI * rt;
  f2 = __distanceAtAngle(candidate, template, x2, centroid);
  while (Math.abs(rt - lt) > STEP) {
    if (f1 < f2) {
      rt = x2;
      x2 = x1;
      f2 = f1;
      x1 = PHI * lt + (1.0 - PHI) * rt;
      f1 = __distanceAtAngle(candidate, template, x1, centroid);
    } else {
      lt = x1;
      x1 = x2;
      f1 = f2;
      x2 = (1.0 - PHI) * lt + PHI * rt;
      f2 = __distanceAtAngle(candidate, template, x2, centroid);
    }
  }
  return Math.min(f1, f2);
};

__resample = function (points) {
  let distance;
  let idx;
  let point;
  let prev;
  let resampled;
  let seperator;
  let space;
  let x;
  let y;
  seperator = (___length(points)) / (_options.parts - 1);
  distance = 0.0;
  resampled = [];
  resampled.push([points[0][0], points[0][1]]);
  idx = 1;
  while (idx < points.length) {
    prev = points[idx - 1];
    point = points[idx];
    space = ___distance(prev, point);
    if ((distance + space) >= seperator) {
      x = prev[0] + ((seperator - distance) / space) * (point[0] - prev[0]);
      y = prev[1] + ((seperator - distance) / space) * (point[1] - prev[1]);
      resampled.push([x, y]);
      points.splice(idx, 0, [x, y]);
      distance = 0.0;
    } else {
      distance += space;
    }
    idx += 1;
  }
  while (resampled.length < _options.parts) {
    resampled.push([points[points.length - 1][0], points[points.length - 1][1]]);
  }
  return resampled;
};

__rotateToZero = function (points) {
  let centroid;
  let theta;
  centroid = ___centroid(points);
  theta = Math.atan2(centroid[1] - points[0][1], centroid[0] - points[0][0]);
  return ___rotate(points, -theta, centroid);
};

__scaleToSquare = function (points) {
  let deltaX;
  let deltaY;
  let i;
  let len;
  let maxX;
  let maxY;
  let minX;
  let minY;
  let offset;
  let point;
  minX = minY = +Infinity;
  maxX = maxY = -Infinity;
  for (i = 0, len = points.length; i < len; i++) {
    point = points[i];
    minX = Math.min(point[0], minX);
    maxX = Math.max(point[0], maxX);
    minY = Math.min(point[1], minY);
    maxY = Math.max(point[1], maxY);
  }
  deltaX = maxX - minX;
  deltaY = maxY - minY;
  offset = [SIZE / deltaX, SIZE / deltaY];
  return ___scale(points, offset);
};

__translateToOrigin = function (points) {
  let centroid;
  centroid = ___centroid(points);
  centroid[0] *= -1;
  centroid[1] *= -1;
  return ___translate(points, centroid);
};

__distanceAtAngle = function (points1, points2, radians, centroid) {
  let _points1;
  let result;
  _points1 = ___rotate(points1, radians, centroid);
  result = ___delta(_points1, points2);
  return result;
};

___delta = function (points1, points2) {
  let delta;
  let i;
  let idx;
  let len;
  let point;
  delta = 0.0;
  for (idx = i = 0, len = points1.length; i < len; idx = ++i) {
    point = points1[idx];
    delta += ___distance(points1[idx], points2[idx]);
  }
  return delta / points1.length;
};

___length = function (points) {
  let i;
  let len;
  let length;
  let point;
  let prev;
  length = 0.0;
  prev = null;
  for (i = 0, len = points.length; i < len; i++) {
    point = points[i];
    if (prev !== null) {
      length += ___distance(prev, point);
    }
    prev = point;
  }
  return length;
};

___distance = function (p1, p2) {
  let x;
  let y;
  x = Math.pow(p1[0] - p2[0], 2);
  y = Math.pow(p1[1] - p2[1], 2);
  return Math.sqrt(x + y);
};

___centroid = function (points) {
  let i;
  let len;
  let point;
  let x;
  let y;
  x = 0.0;
  y = 0.0;
  for (i = 0, len = points.length; i < len; i++) {
    point = points[i];
    x += point[0];
    y += point[1];
  }
  x /= points.length;
  y /= points.length;
  return [x, y];
};

___rotate = function (points, radians, pivot) {
  let cos;
  let deltaX;
  let deltaY;
  let i;
  let idx;
  let len;
  let neew;
  let point;
  let sin;
  sin = Math.sin(radians);
  cos = Math.cos(radians);
  neew = [];
  for (idx = i = 0, len = points.length; i < len; idx = ++i) {
    point = points[idx];
    deltaX = points[idx][0] - pivot[0];
    deltaY = points[idx][1] - pivot[1];
    points[idx][0] = deltaX * cos - deltaY * sin + pivot[0];
    points[idx][1] = deltaX * sin + deltaY * cos + pivot[1];
  }
  return points;
};

___scale = function (points, offset) {
  let i;
  let idx;
  let len;
  let point;
  for (idx = i = 0, len = points.length; i < len; idx = ++i) {
    point = points[idx];
    points[idx][0] *= offset[0];
    points[idx][1] *= offset[1];
  }
  return points;
};

___translate = function (points, offset) {
  let i;
  let idx;
  let len;
  let point;
  for (idx = i = 0, len = points.length; i < len; idx = ++i) {
    point = points[idx];
    points[idx][0] += offset[0];
    points[idx][1] += offset[1];
  }
  return points;
};

___radians = function (degrees) {
  return degrees * Math.PI / 180.0;
};

// console.log("onedollar")
// if (typeof exports !== 'undefined') {
//   //exports.OneDollar = OneDollar;
//   console.log("onedollar export")
// }

// //# sourceMappingURL=maps/onedollar.js.map
