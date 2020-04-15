    // VALIDATION
    $('form').each(function(){
    // Объявляем переменные (форма и кнопка отправки)
        $(this).submit(function(e) {
            e.preventDefault();
            var form = $(this);
            var url = form.attr('action');
            var method = form.attr('method');
            var error = 0;

            $(form).find("input").each(function() {

                        var str = $(this).val();
                        var value = $.trim(str);

                        if($(this).hasClass('optional')) {
                            return true;
                        } else {
                            if(!value){
                                $(this).addClass('error');
                                error = 1;
                            }
                            else {
                                var str_length = value.length;
                                if($(this).attr('name') == 'name'){
                                    if(str_length < 2 || str_length > 36){
                                        error = 1;
                                        $(this).addClass('error');
                                    }
                                    else {
                                        $(this).removeClass('error');
                                    }
                                    // else {
                                    //     var regex = new RegExp(/^[а-яА-ЯёЁa-zA-Z]*$/);
                                    //     if(regex.test(value) == false) {
                                    //         error = 1;
                                    //         $(this).addClass('error');
                                    //     }
                                    //     else{
                                    //         $(this).removeClass('error');
                                    //     }
                                    // }
                                }
                                if($(this).attr('name') == 'email'){
                                    if(str_length < 3 || str_length > 64){
                                        error = 1;
                                        $(this).addClass('error');
                                    }
                                    else {
                                        var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                                        if(regex.test(value) == false) {
                                            error = 1;
                                            $(this).addClass('error');
                                        }
                                        else{
                                            $(this).removeClass('error');
                                        }
                                    }
                                }
                                if($(this).attr('name') == 'age'){
                                    if(str_length < 1 || str_length > 3){
                                        error = 1;
                                        $(this).addClass('error');
                                    }
                                    else {
                                        var regex = /^[0-9]*$/;
                                        if(regex.test(value) == false) {
                                            error = 1;
                                            $(this).addClass('error');
                                        }
                                        else{
                                            var age = Number(value);
                                            if(age < 16 || age > 125){
                                                error = 1;
                                                $(this).addClass('error');
                                            }
                                            else{
                                                $(this).removeClass('error');
                                            }
                                        }
                                    }
                                }
                                if($(this).attr('name') == 'count'){
                                    if(str_length < 1 || str_length > 12){
                                        error = 1;
                                        $(this).addClass('error');
                                    }
                                    else {
                                        var regex = /^(?!0.*$)([0-9]{1,12})$/;
                                        if(regex.test(value) == false) {
                                            error = 1;
                                            $(this).addClass('error');
                                        }
                                        else{
                                            $(this).removeClass('error');
                                        }
                                    }
                                }
                                if($(this).attr('name') == 'phone'){
                                    if(str_length < 10 || str_length > 12){
                                        error = 1;
                                        $(this).addClass('error');
                                    }
                                    else {
                                        $(this).removeClass('error');
                                    }
                                }
                                if($(this).attr('name') == 'social_link'){
                                    if(str_length < 10 || str_length > 80){
                                        error = 1;
                                        $(this).addClass('error');
                                    }
                                    else {
                                        var regex = new RegExp(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i);
                                        if(regex.test(value) == false) {
                                            error = 1;
                                            $(this).addClass('error');
                                        }
                                        else{
                                            $(this).removeClass('error');
                                        }
                                    }
                                }
                                if($(this).attr('name') == 'birthday'){
                                    if(str_length !== 10){
                                        error = 1;
                                        $(this).addClass('error');
                                    }
                                    else {
                                        var regex = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);
                                        if(regex.test(value) == false) {
                                            error = 1;
                                            $(this).addClass('error');
                                        }
                                        else{
                                            $(this).removeClass('error');
                                        }
                                    }
                                }
                                if($(this).attr('name') == 'password'){
                                    if(str_length < 8 || str_length > 24){
                                        error = 1;
                                        $(this).addClass('error');
                                    }
                                    else {
                                        var regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/i);
                                        if(regex.test(value) == false) {
                                            error = 1;
                                            $(this).addClass('error');
                                        }
                                        else{
                                            $(this).removeClass('error');
                                        }
                                    }
                                }
                            }
                        }
               })
            if(error) return 1;
        });

});
