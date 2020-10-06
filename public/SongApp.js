(function(window, $) {
    'use strict';

    window.SongApp = function($wrapper) {
        var vote = new Vote($wrapper);
    };

    var Vote = function($wrapper) {
        this.$wrapper = $wrapper;

        this.$wrapper.on(
            'click',
            '.js-vote-delete',
            this.deleteVote.bind(this)
        );

        this.$wrapper.on(
            'submit',
            '.js-new-vote-form',
            this.addVote.bind(this)
        );
    };

    $.extend(Vote.prototype, {
        addVote: function(e) {
            // do not submit form
            e.preventDefault();

            var $form = $(e.currentTarget);
            var formData = $form.serializeArray();
            var song = formData[0].value;
            var quantity = formData[1].value;

            var $table = this.$wrapper.find('.js-vote-table tbody');

            $.ajax({
                url: $form.attr('action'),
                context: this,
                method: 'POST',
                data: $form.serialize(),
                success: function(response) {
                    // add row to votes table
                    $table.append(response);

                    // find count table cell containing the vote(s)
                    var $cell = this.$wrapper.find('.js-count-cell-' + song);
                    // update count cell to reflect new vote(s)
                    var count = parseInt($cell.text()) + parseInt(quantity);
                    $cell.text(count);

                    this.sortCount();
                },
                error: function(jqXHR) {
                    $form.closest('.js-new-vote-form-wrapper')
                        .html(jqXHR.responseText);
                }
            });
        },

        deleteVote: function(e) {
            // do not follow link
            e.preventDefault();

            // change icon to red spinner
            var $link = $(e.currentTarget);
            $link.addClass('text-danger');
            $link.find('span').removeClass('fa-trash-alt').addClass('fa-spinner fa-spin');

            $.ajax({
                url: $link.attr('href'),
                context: this,
                method: 'DELETE',
                success: function() {
                    // remove row from votes table
                    $link.closest('tr').fadeOut();

                    // find count table cell containing the vote(s)
                    var $cell = this.$wrapper.find('.js-count-cell-' + $link.data('song'));
                    // update count cell to reflect deleted vote(s)
                    var count = parseInt($cell.text()) - parseInt($link.data('quantity'));
                    $cell.text(count);

                    this.sortCount();
                }
            });
        },

        sortCount: function() {
            var $table = this.$wrapper.find('.js-count-table tbody');
            var $rows = $table.find('tr');

            // sort rows by count total in descending order
            $rows.sort(function(a, b) {
                return $(b).children().last().html() - $(a).children().last().html();
            });

            // update count table rows to updated order
            $.each($rows, function(index, $row) {
                $table.append($row);
            });
        }
    });

})(window, jQuery);