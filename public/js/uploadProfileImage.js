$(document).ready(function(){
    $('.upload-btnPI').on('click', function() {
        $('#upload-inputPI').click();

        $('.progress-bar').text('0%');
        $('.progress-bar').width('0%');
    });

    $('#upload-inputPI').on('change', function() {
        var uploadInput = $('#upload-inputPI');

        if(uploadInput.val() != ''){
            var formData = new FormData();
            formData.append('upload', uploadInput[0].files[0]);

            $.ajax({
                url:'/uploadProfileImage',
                type:'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){
                    uploadInput.val('');
                },

                xhr: function(){
                    var xhr = new XMLHttpRequest();

                    xhr.upload.addEventListener('progress',function(e){
                        if(e.lengthComputable){
                            var uploadPercent = e.loaded / e.total;
                            uploadPercent = ( uploadPercent * 100 );
                            uploadPercent = parseFloat(uploadPercent.toFixed(0));

                            $('.progress-bar').text(uploadPercent + '%');
                            $('.progress-bar').width(uploadPercent + '%');

                            if(uploadPercent === 100){
                                $('.progress-bar').text('100%');
                                $('#completed').text('File Uploaded');
                            }
                        }
                    }, false);
                    return xhr;
                }
            });
        }
    })
})
