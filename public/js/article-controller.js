// 对于绑定未来生成的元素，需要使用到事件委托,先将事件注册到父元素中，由于事件的冒泡机制，所以当目标元素触发事件时
// 也会冒泡到父元素中，通过在父元素上注册事件处理程序，通过event对象获取触发该事件的目标元素，如果该目标元素与事件处理程序中传入的目标选择器是否匹配，如果匹配则触发该事件处理程序
// on(events,[selecor],[data],fn)  
// events一个或多个用空格分隔的事件类型和可选的命名空间，如'click'或者是带命名空间的'mousedown.myplugin'代表是触发mousedown事件的类名为myplugin的元素
// [seletor]一个选择器的字符串，用于过滤触发该事件的目标元素，这个参数如果省略或者为null，即表示不进行过滤

$(function (){
  $(document).on('click', '.praise', function (e){
    e.preventDefault();
    var $target = $(this);
    var url = $target.attr('href');
    $.ajax({
      url: url,
      method: 'GET',
      success: function(data){
        $target.find('.count').text(data.count);
        $target.toggleClass('is-active');
      },
      error: function (xhr, statusCode, error){
        console.error(error);
      }
    });
  });
})