var SongApp = {
    initialize: function($table) {
        $table.find('.js-vote-delete').on(
            'click',
            this.deleteVote.bind(this)
        );
    },

    deleteVote: function(e) {
        e.preventDefault();

        // change icon to red spinner
        var $link = $(e.currentTarget);
        $link.addClass('text-danger');
        $link.find('span')
            .removeClass('fa-trash-alt')
            .addClass('fa-spinner')
            .addClass('fa-spin');

        $.ajax({
            url: $link.data('url'),
            context: this,
            method: 'DELETE',
            success: function() {
                $link.closest('tr').fadeOut();
                this.updateCount($link.data('song'), $link.data('quantity'));
                this.sortCount();
            }
        });
    },

    updateCount: function(id, quantity) {
        // count table row that contains the deleted vote
        var $row = $('.js-count-row-' + id);
        // cell that contains the count value
        var $cell = $row.children().last();
        // vote count minus the deleted votes
        var newCount = $cell.html() - quantity;

        // remove count row if zero votes or update the cell
        if (newCount == 0) {
            $row.fadeOut();
        } else {
            $cell.html(newCount);
        }
    },

    sortCount: function() {
        var $table = $('.js-count-table tbody');
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
}