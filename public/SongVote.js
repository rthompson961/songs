'use strict';

class Vote {
    constructor($wrapper) {
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
    }

    addVote(e) {
        // do not submit form
        e.preventDefault();

        const $form = $(e.currentTarget);
        const formData = $form.serializeArray();
        const song = formData[0].value;
        const quantity = formData[1].value;

        const $table = this.$wrapper.find('.js-vote-table tbody');

        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: $form.serialize()
        }).then((response) => {
            // add row to votes table
            $table.append(response);

            // find count table cell containing the vote(s)
            const $cell = this.$wrapper.find('.js-count-cell-' + song);
            // update count cell to reflect new vote(s)
            const count = parseInt($cell.text()) + parseInt(quantity);
            $cell.text(count);

            this.sortCount();
        }).catch((jqXHR) => {
            $form.closest('.js-new-vote-form-wrapper')
                .html(jqXHR.responseText);
        });
    }

    deleteVote(e) {
        // do not follow link
        e.preventDefault();

        // change icon to red spinner
        const $link = $(e.currentTarget);
        $link.addClass('text-danger');
        $link.find('span').removeClass('fa-trash-alt').addClass('fa-spinner fa-spin');

        $.ajax({
            url: $link.attr('href'),
            method: 'DELETE'
        }).then(() => {
            // remove row from votes table
            $link.closest('tr').fadeOut();

            // find count table cell containing the vote(s)
            const $cell = this.$wrapper.find('.js-count-cell-' + $link.data('song'));
            // update count cell to reflect deleted vote(s)
            const count = parseInt($cell.text()) - parseInt($link.data('quantity'));
            $cell.text(count);

            this.sortCount();
        });
    }

    sortCount() {
        const $table = this.$wrapper.find('.js-count-table tbody');
        const $rows = $table.find('tr');

        // sort rows by count total in descending order
        $rows.sort((a, b) => {
            return $(b).children().last().html() - $(a).children().last().html();
        });

        // update count table rows to updated order
        $.each($rows, (index, $row) => {
            $table.append($row);
        });
    }
}

module.exports = Vote;