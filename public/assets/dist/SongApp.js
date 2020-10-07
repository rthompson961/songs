'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window, $) {
    'use strict';

    var SongApp = function SongApp($wrapper) {
        _classCallCheck(this, SongApp);

        var vote = new Vote($wrapper);
    };

    var Vote = function () {
        function Vote($wrapper) {
            _classCallCheck(this, Vote);

            this.$wrapper = $wrapper;

            this.$wrapper.on('click', '.js-vote-delete', this.deleteVote.bind(this));

            this.$wrapper.on('submit', '.js-new-vote-form', this.addVote.bind(this));
        }

        _createClass(Vote, [{
            key: 'addVote',
            value: function addVote(e) {
                var _this = this;

                // do not submit form
                e.preventDefault();

                var $form = $(e.currentTarget);
                var formData = $form.serializeArray();
                var song = formData[0].value;
                var quantity = formData[1].value;

                var $table = this.$wrapper.find('.js-vote-table tbody');

                $.ajax({
                    url: $form.attr('action'),
                    method: 'POST',
                    data: $form.serialize()
                }).then(function (response) {
                    // add row to votes table
                    $table.append(response);

                    // find count table cell containing the vote(s)
                    var $cell = _this.$wrapper.find('.js-count-cell-' + song);
                    // update count cell to reflect new vote(s)
                    var count = parseInt($cell.text()) + parseInt(quantity);
                    $cell.text(count);

                    _this.sortCount();
                }).catch(function (jqXHR) {
                    $form.closest('.js-new-vote-form-wrapper').html(jqXHR.responseText);
                });
            }
        }, {
            key: 'deleteVote',
            value: function deleteVote(e) {
                var _this2 = this;

                // do not follow link
                e.preventDefault();

                // change icon to red spinner
                var $link = $(e.currentTarget);
                $link.addClass('text-danger');
                $link.find('span').removeClass('fa-trash-alt').addClass('fa-spinner fa-spin');

                $.ajax({
                    url: $link.attr('href'),
                    method: 'DELETE'
                }).then(function () {
                    // remove row from votes table
                    $link.closest('tr').fadeOut();

                    // find count table cell containing the vote(s)
                    var $cell = _this2.$wrapper.find('.js-count-cell-' + $link.data('song'));
                    // update count cell to reflect deleted vote(s)
                    var count = parseInt($cell.text()) - parseInt($link.data('quantity'));
                    $cell.text(count);

                    _this2.sortCount();
                });
            }
        }, {
            key: 'sortCount',
            value: function sortCount() {
                var $table = this.$wrapper.find('.js-count-table tbody');
                var $rows = $table.find('tr');

                // sort rows by count total in descending order
                $rows.sort(function (a, b) {
                    return $(b).children().last().html() - $(a).children().last().html();
                });

                // update count table rows to updated order
                $.each($rows, function (index, $row) {
                    $table.append($row);
                });
            }
        }]);

        return Vote;
    }();

    window.SongApp = SongApp;
})(window, jQuery);
