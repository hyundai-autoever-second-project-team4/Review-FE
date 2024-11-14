const countryMapping = {
  xx: "언어 없음",
  aa: "아파르어",
  af: "아프리칸스어",
  ak: "아칸어",
  an: "아라곤어",
  as: "아삼어",
  av: "아바르어",
  ae: "아베스탄어",
  ay: "아이마라어",
  az: "아제르바이잔어",
  ba: "바시키르어",
  bm: "밤바라어",
  bn: "벵골어",
  bi: "비스라마어",
  bo: "티베트어",
  bs: "보스니아어",
  br: "브르타뉴어",
  ca: "카탈루냐어",
  cs: "체코어",
  ch: "차모로어",
  ce: "체첸어",
  cu: "슬라브어",
  cv: "추바시어",
  kw: "콘월어",
  co: "코르시카어",
  cr: "크리어",
  cy: "웨일스어",
  da: "덴마크어",
  de: "독일어",
  dv: "디베히어",
  dz: "종카어",
  en: "영어",
  eo: "에스페란토",
  et: "에스토니아어",
  eu: "바스크어",
  fo: "파로어",
  fj: "피지어",
  fi: "핀란드어",
  fr: "프랑스어",
  fy: "프리지아어",
  ff: "풀라어",
  gd: "게일어",
  ga: "아일랜드어",
  gl: "갈리시아어",
  gv: "맨x어",
  gn: "과라니어",
  gu: "구자라티어",
  ht: "아이티어; 아이티 크리올어",
  ha: "하우사어",
  sh: "세르보-크로아티아어",
  hz: "헤레로어",
  ho: "히리 모투어",
  hr: "크로아티아어",
  hu: "헝가리어",
  ig: "이그보어",
  io: "이도어",
  ii: "이족어",
  iu: "이누크티투트어",
  ie: "인터링크어",
  ia: "인터링구아",
  id: "인도네시아어",
  ik: "이누피악어",
  is: "아이슬란드어",
  it: "이탈리아어",
  ga: "아일랜드어",
  gl: "갈리시아어",
  gv: "맨x어",
  gn: "과라니어",
  gu: "구자라티어",
  ht: "아이티어; 아이티 크리올어",
  ha: "하우사어",
  sh: "세르보-크로아티아어",
  hz: "헤레로어",
  ho: "히리 모투어",
  hr: "크로아티아어",
  hu: "헝가리어",
  ig: "이그보어",
  io: "이도어",
  ii: "이족어",
  iu: "이누크티투트어",
  ie: "인터링크어",
  ia: "인터링구아",
  id: "인도네시아어",
  ik: "이누피악어",
  is: "아이슬란드어",
  it: "이탈리아어",
  jv: "자바어",
  ja: "일본어",
  kl: "칼라알리수트어",
  kn: "칸나다어",
  ks: "카슈미르어",
  ka: "조지아어",
  kr: "카누리어",
  kk: "카자흐어",
  km: "크메르어",
  ki: "키쿠유어",
  rw: "키냐르완다어",
  ky: "키르기스어",
  kv: "코미어",
  kg: "콩고어",
  ko: "한국어",
  kj: "쿠안야마어",
  ku: "쿠르드어",
  lo: "라오어",
  la: "라틴어",
  lv: "라트비아어",
  li: "림부르그어",
  ln: "링갈라어",
  lt: "리투아니아어",
  lb: "레체부르크어",
  lu: "루바-카탕가어",
  lg: "간다어",
  mh: "마샬어",
  ml: "말라얄람어",
  mr: "마라티어",
  mg: "말라가시어",
  mt: "말티어",
  mo: "몰도바어",
  mn: "몽골어",
  mi: "마오리어",
  ms: "말레이어",
  my: "버마어",
  na: "나우루어",
  nv: "나바호어",
  nr: "은데벨레어",
  nd: "은데벨레어",
  ng: "돈가어",
  ne: "네팔어",
  nl: "네덜란드어",
  nn: "노르웨이어(니노르스크)",
  nb: "노르웨이어(북부)",
  no: "노르웨이어",
  ny: "치체와어; 냐냐어",
  oc: "옥시타니아어",
  oj: "오지부와어",
  or: "오리야어",
  om: "오로모어",
  os: "오세티아어",
  pa: "펀자비어",
  pi: "팔리어",
  pl: "폴란드어",
  pt: "포르투갈어",
  qu: "케추아어",
  rm: "레토로망어",
  ro: "루마니아어",
  rn: "룬디어",
  ru: "러시아어",
  sg: "상고어",
  sa: "산스크리트어",
  si: "신할라어",
  sk: "슬로바키아어",
  sl: "슬로베니아어",
  se: "북부 사미어",
  sm: "사모아어",
  sn: "쇼나어",
  sd: "신디어",
  so: "소말리어",
  st: "소토어",
  es: "스페인어",
  sq: "알바니아어",
  sc: "사르디니아어",
  sr: "세르비아어",
  ss: "스와티어",
  su: "순다어",
  sw: "스와힐리어",
  sv: "스웨덴어",
  ty: "타히티어",
  ta: "타밀어",
  tt: "타타르어",
  te: "텔루구어",
  tg: "타지크어",
  tl: "타갈로그어",
  th: "태국어",
  ti: "티그리냐어",
  to: "통가어",
  tn: "츠와나어",
  ts: "쯔onga어",
  tk: "투르크멘어",
  tr: "터키어",
  tw: "트위어",
  ug: "위구르어",
  uk: "우크라이나어",
  ur: "우르두어",
  uz: "우즈벡어",
  ve: "벤다어",
  vi: "베트남어",
  vo: "볼라푹어",
  wa: "왈론어",
  wo: "울로프어",
  xh: "코사어",
  yi: "이디시어",
  za: "좡어",
  zu: "줄루어",
  ab: "압하즈어",
  zh: "중국어",
  ps: "파슈토어",
  am: "암하릭어",
  ar: "아랍어",
  be: "벨라루스어",
  bg: "불가리아어",
  cn: "광둥어",
  mk: "마케도니아어",
  ee: "에웨어",
  el: "그리스어",
  fa: "페르시아어",
  he: "히브리어",
  hi: "힌디어",
  hy: "아르메니아어",
  yo: "요루바어",
};

export default countryMapping;
