var handleSummernote = function () {
    $('#summernote_1').summernote({
        height: 300,
        callbacks: {
            onImageUpload: function(image) {
                uploadImage(image[0]);
            }
        }
    });

    $(document).on('click','.btn-blog',function(){
        $('textarea[name="texto"]').text($('#summernote_1').summernote('code'));
    });
}

var uploadImage = function (image) {
    var data = new FormData();
    data.append("image", image);

    $.ajax({
        url: '/admin/blog/cargar-imagen',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        dataType: "json",
        type: "POST",
        success: function(data) {
            if(data.code == 200){
                var image = $('<img>').attr('src',data.url).addClass('img-responsive');
                
                $('#summernote_1').summernote("insertNode", image[0]);
            }

           if(data.code == 400){
                console.log(data);
            }
        }
    });
}
