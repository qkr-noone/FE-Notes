function create(proto) {
  function F() { };
  F.prototype = proto;
  F.prototype.constructor = F;

  return new F();
}

// 9.25 recode https://juejin.im/post/6844903589815517192

function createAlpha(proto) {
  function F() {}
  F.prototype = proto
  F.prototype.constructor = F
  return new F()
}