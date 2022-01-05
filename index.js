/** 
 * 获取页面 url 全部参数
 * url: url地址
 * 例子：http://www.abc.com?name=Lucy&study=js&study=node&study=vue => {name:'Lucy', study:[ 'js','node', 'vue']}
 */
 const getUrlParams = (url) => {
  if (url.indexOf('?') == -1) {
    return '暂无参数';
  }
  let _result = {};
  let _paramsList = url.split('?')[1].split('&');
  for (let i in _paramsList) {
    let _key = _paramsList[i].split('=')[0];
    let _value = _paramsList[i].split('=')[1];
    if (_result[_key]) {
      _result[_key].push(_value);
    } else {
      _result[_key] = [_value];
    }
  }
  for (let i in _result) {
    if (_result[i].length == 1) {
      _result[i] = _result[i][0];
    }
  }
  return _result;

}

/** 
 * 身份证校验
 * ID: 身份证号
 */
const checkID = (ID) => {
  // 身份证号码为15位或者18位，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(ID) === true ? true : false
}

/** 
 * 获取当前年月日
 * split: 分隔符
 * 例子：2022-01-04
 */
const getCurrentDate = (split) => {
  let _split = (split && typeof split === 'string') ? split : '/'
  var _Date = new Date()
  var y = _Date.getFullYear()
  var m = isAddZero(_Date.getMonth() + 1)
  var d = isAddZero(_Date.getDate())
  function isAddZero(num) {
    return num < 10 ? `0${num}` : num
  }
  return y + _split + m + _split + d
}

/** 
 * 格式化资金数字，将数字转化为千分位，三位以逗号隔开
 * num: 金额
 * toFixedNum: 保留几位有效数字
 * 例子：1,234.6789、1,234.68
 */
const formartMoney = (num, toFixedNum) => {
  let _num = Number(num)
  let decimals, integer;
  let m = [];
  let isBack = false;
  if (_num < 0) {
    isBack = true;
    _num = -_num;
  }
  if (_num == 0 || _num == null) {
    return 0;
  }
  if (isNaN(_num)) {
    return _num;
  }
  _num = toFixedNum ? _num.toFixed(toFixedNum) : String(_num)
  //获取小数部分
  decimals = _num.match(/\.[0-9]*/g);
  //获取整数部分
  integer = parseInt(_num).toString();
  let temp = integer.split("");
  let length = temp.length;
  if (isBack) {
    return length > 3 ? '-' + formart() : '-' + _num;
  } else {
    return length > 3 ? formart() : _num;
  }
  //添加","分隔符
  function formart() {
    var result;
    var count = 0;
    for (var n = length; n > 0; n--, count++) {
      if (count && count % 3 == 0) {
        m.unshift(",");
        count = 0;
      }
      m.unshift(temp.pop());
    }
    result = m.join("");
    return decimals ? result.concat(decimals) : result;
  }
}

export {
  getUrlParams,
  checkID,
  getCurrentDate,
  formartMoney,
}

