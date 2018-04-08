$(function() {                                   //poczatek funckji. funkcja opakowana w jquery $(function() {   })    całe drzewo DOM

function randomString() {          //funkcja w funkcji. randomString generuje randomowe ID
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';  //zmienna znaki sposrod ktorych zrobione jest ID
    var str = '';
    for (var i = 0; i < 10; i++) {  //funkcja for w funkcji randomString
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}  //koniec funkcji randomString

//KLASA COLUMN
function Column(name) {    //poczatek funkcji Column
    var self = this; 
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {  //funkcja create column , tworzy kolumne
        var $column = $('<div>').addClass('column');                       //tworzenie elementow kolumny //div , dodajemy klase
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name); //jw  //tekst w kolumnie , name zawarte wczesniej w zmiennej name
        var $columnCardList = $('<ul>').addClass('column-card-list');  //jw  //lista na kartki
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');  //jw  //przycisk usun kolumne
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card'); //jw   //przycisk dodaj kolumne

            $columnDelete.click(function() {  //event klik usuniecie kolumny
                self.removeColumn();
        });
        //Add a note after clicking on the button:
             $columnAddCard.click(function() {   //event klik dodaj kartke 
                self.addCard(new Card(prompt("Enter the name of the card")));  //wyswietla okienko gidze wpisujemy nazwe karteczki
    });

    $column.append($columnTitle)   //polaczenie wszystkich wezlow w odpowiedniej kolejnosci
           .append($columnDelete)  // apend wciska okreslony element na koncu okreslonego elementu
           .append($columnAddCard)
           .append($columnCardList);

    return $column;
  }


  };

  Column.prototype = {   //dodajemy 2 metody do prototypu , czyli uzupelniamy klase column -> create column  -> add card -> new card  - podajemy co ma sie stac co ma sie stworzyc
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
};

//KLASA CARD

function Card(description) {
	var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.description);
        var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $cardDelete.click(function(){
                self.removeCard();
        });
        
        $card.append($cardDelete)
        .append($cardDescription);

        return $card;
    }
}

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
    }
}

//OBIEKT TABLICY
var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')

};

function initSortable() {  //przeciaganie
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  $('.create-column')
  .click(function(){
	var name = prompt('Enter a column name');
	var column = new Column(name);
    	board.addColumn(column);
  });

  // CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// CREATING CARDS
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);

}); //koniec funkcji