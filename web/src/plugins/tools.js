//
import Vue from "vue";

// 定义弹窗函数
Vue.prototype.$alert = function(msg = "messages", title = "tips",{
    confirmText,closeHander
}) {
  let div = document.createElement("div");
  let confirmText1=confirmText || "确定"
  div.className = "message-mask";
  div.innerHTML = `
    <div class="message d-flex flex-column p-2">
    <div class="d-flex flex-jc-between my-3 flex-ai-center"><h3 class="text-dark">${title}</h3><i class="iconfont iconclose text-dark hover-pointer"></i></div>
    <p>${msg}</p>
    <button class="bg-blue text-white px-3 py-2 hover-pointer">${confirmText1}</button>
    </div>
    `;
  document.body.appendChild(div);
// 绑定单击关闭按钮的事件
div.querySelector('i').addEventListener('click',function(){
    // 先删除节点
    document.body.removeChild(div)
    // 再执行回调函数
    closeHander && closeHander()
})
// 绑定单击确定按钮的事件
div.querySelector('button').addEventListener('click',function(){
    // 先删除节点
    document.body.removeChild(div)
    // 再执行回调函数
    closeHander && closeHander()
})
//   3秒后自动消失
setTimeout(() => {
    // 先判断该div是否存在，存在则删除   
    document.querySelector('.message-mask') && document.body.removeChild(div)    
}, 3000);
};
