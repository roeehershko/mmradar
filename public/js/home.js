/**
 * Created by django on 3/4/2017.
 */
(function () {
    $('.review-box').each(function (idx, el) {
        var $el = $(el);
        var offer = $el.data('review');

        console.log(offer);
        $el.find('.review-box-img').css({
            'background-image': 'url(img/reviews/' + offer + '/thumb.jpg)'
        });
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $('#subscribe-btn').on('click', function () {
        var $this = $(this);
        var $modal = $('#subscribeModal');
        $this.attr('disabled', 'disabled');

        if (validateEmail($modal.find('input[name=email]').val())) {
            $.ajax({
                url: '/subscribe',
                type: 'post',
                data: {
                    email: $modal.find('input[name=email]').val(),
                    name: $modal.find('input[name=name]').val(),
                }
            });

            setTimeout(function () {
                $modal.find('#sub-form').hide();
                $modal.find('.hidden').removeClass('hidden');
            }, 1500);
        }
        else {
            alert('Invalid email address');
            $this.attr('disabled', null);
        }
    })
}());

