/**
 * Created by django on 3/4/2017.
 */
(function () {
    $('.review-box').each(function (idx, el) {
        var $el = $(el);
        var offer = $el.data('review');

        $el.find('.review-box-img').css({
            'background-image': 'url(public/img/reviews/' + offer + '/thumb.jpg)'
        });
    })
}());

