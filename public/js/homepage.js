$(function (){
  // 将cropper插件绑定到jquery上
  $.fn.cropper();
  // 初始化裁剪工具
  $('#tocut-image').cropper({
    aspectRatio: 1 / 1,
    // preview: '#preview',
  });

  // 确认裁剪，上传裁剪后的图片，并更新本地的avatar头像
  $('#crop-btn').on('click', function (e){

    $('#tocut-image').cropper('getCroppedCanvas', {
      width: 160,
      height: 160,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    }).toBlob(function (blob){
      var formData = new FormData();
      formData.append('avatar', blob);

      $.ajax({
        url: '/upload_avatar',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data){
          $('.editor-modal').fadeOut(300);
          updateAvatar();
        },
        error: function (xhr, status, error){
          console.error(error);
        }
      });

    });

    // 更新本地的用户avatar头像
    function updateAvatar(){
      var username = 
      $.ajax({
        url: '/people/avatar',
        method: 'GET',
        success: function (avatar){
          $('.avatar').find('img').attr('src', avatar.url);
        },
        error: function (xhr, status, error){
          console.error(error);
        }
      })
    }

  });
  
  // 在mask层被点击时，使用click方法触发表单元素的上传事件
  $('.mask').on('click', function (e){
    e.preventDefault();
    $('#upload-avatar').click();
  });

  // 阻止继续冒泡
  $('#upload-avatar').on('click', function (e){
    e.stopPropagation(); 
  });

  // 监听input事件
  $('#upload-avatar').on('change', function (e){
    e.preventDefault();
    var reader = new FileReader();
    reader.onload = function (e){
      // 图片的URI数据形式
      var image_url = reader.result;
      // console.log(image_url);
      $('.editor-modal').fadeIn(300).find('.img-area');
      $('#tocut-image').cropper('replace', image_url)
    }
    reader.onerror = function (e){

    }
    reader.onprogress = function (e){

    }
    reader.readAsDataURL(e.target.files[0]);
  })

  // 关闭页面
  $('.close-icon').on('click', function (e){
    $('.editor-modal').fadeOut(300);
  })

})