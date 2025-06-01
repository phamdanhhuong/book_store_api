CREATE DATABASE  IF NOT EXISTS book_store;
use book_store;

INSERT INTO users (username,password, fullname,email, phone_number) VALUES
('huong','123456','Phạm Danh Hưởng','danhhuong@gmail.com','0361212121');

INSERT INTO categories (name,cover_url) VALUES
('Programming','https://martinfowler.com/books/r2p.jpg'),
('JavaScript','https://m.media-amazon.com/images/I/71FU6nxVhAL._AC_UF1000,1000_QL80_.jpg'),
('Computer Science','https://m.media-amazon.com/images/I/61tIrzRmFdL.jpg'),
('Operating Systems','https://media.wiley.com/product_data/coverImage300/66/11198003/1119800366.jpg'),
('Networking','https://m.media-amazon.com/images/I/81ewUnANZPL._AC_UF1000,1000_QL80_.jpg'),
('Software Engineering','https://m.media-amazon.com/images/I/81gtKoapHFL.jpg'),
('Algorithms','https://m.media-amazon.com/images/I/81vpsIs58WL.jpg'),
('Python','https://m.media-amazon.com/images/I/81kqrwS1nNL.jpg');


INSERT INTO books (title, author, category_id, publisher, publication_date, summary, cover_url, price) VALUES
('Refactoring', 'Martin Fowler', 1, 'Addison-Wesley', '1999-07-08', 'Improving the Design of Existing Code', 'https://martinfowler.com/books/r2p.jpg', 189000),
('Code Complete', 'Steve McConnell', 1, 'Microsoft Press', '2004-06-19', 'A Practical Handbook of Software Construction', 'https://upload.wikimedia.org/wikipedia/en/5/58/Code_Complete_1st_edition.jpg', 230000),
('You Don\'t Know JS', 'Kyle Simpson', 2, 'O\'Reilly Media', '2014-12-27', 'Deep dive into JavaScript core mechanisms', 'https://m.media-amazon.com/images/I/71FU6nxVhAL._AC_UF1000,1000_QL80_.jpg', 99000),
('Eloquent JavaScript', 'Marijn Haverbeke', 2, 'No Starch Press', '2018-12-04', 'A Modern Introduction to Programming', 'https://eloquentjavascript.net/3rd_edition/img/cover.jpg', 145000),
('JavaScript: The Good Parts', 'Douglas Crockford', 2, 'O\'Reilly Media', '2008-05-15', 'Unearthing the Excellence in JavaScript', 'https://m.media-amazon.com/images/I/7185IMvz88L.jpg', 175000),
('The Art of Computer Programming', 'Donald Knuth', 3, 'Addison-Wesley', '1968-01-01', 'Comprehensive algorithms and mathematics', 'https://m.media-amazon.com/images/I/61tIrzRmFdL.jpg', 295000),
('Introduction to the Theory of Computation', 'Michael Sipser', 3, 'Cengage Learning', '2012-06-27', 'Fundamentals of automata and complexity', 'https://m.media-amazon.com/images/I/61dPNb6AUJL._AC_UF1000,1000_QL80_.jpg', 212000),
('Operating System Concepts', 'Silberschatz, Gagne, Galvin', 4, 'Wiley', '2018-01-01', 'Core concepts of operating systems', 'https://media.wiley.com/product_data/coverImage300/66/11198003/1119800366.jpg', 186000),
('Computer Networking: A Top-Down Approach', 'Kurose, Ross', 5, 'Pearson', '2016-03-10', 'A detailed approach to networking', 'https://m.media-amazon.com/images/I/81ewUnANZPL._AC_UF1000,1000_QL80_.jpg', 202000),
('TCP/IP Illustrated', 'W. Richard Stevens', 5, 'Addison-Wesley', '1994-11-01', 'In-depth study of TCP/IP protocols', 'https://m.media-amazon.com/images/I/91Ok5AaCC-L.jpg', 278000),
('Clean Architecture', 'Robert C. Martin', 1, 'Prentice Hall', '2017-09-20', 'Guide to software architecture', 'https://m.media-amazon.com/images/I/51b7XbfMIIL.jpg', 198000),
('The Pragmatic Programmer', 'Andy Hunt, Dave Thomas', 1, 'Addison-Wesley', '1999-10-30', 'Journey to mastery in software development', 'https://m.media-amazon.com/images/I/518FqJvR9aL.jpg', 225000),
('Design Patterns: Elements of Reusable Object-Oriented Software', 'Gamma, Helm, Johnson, Vlissides', 6, 'Addison-Wesley', '1994-10-31', 'Classic book on design patterns', 'https://m.media-amazon.com/images/I/81gtKoapHFL.jpg', 247000),
('Introduction to Algorithms', 'Cormen, Leiserson, Rivest, Stein', 7, 'MIT Press', '2009-07-31', 'Classic textbook on algorithms', 'https://m.media-amazon.com/images/I/81vpsIs58WL.jpg', 284000),
('Algorithms', 'Robert Sedgewick, Kevin Wayne', 7, 'Addison-Wesley', '2011-04-04', 'Algorithms and data structures with Java examples', 'https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg', 199000),
('Python Crash Course', 'Eric Matthes', 8, 'No Starch Press', '2015-11-01', 'Introduction to programming with Python', 'https://m.media-amazon.com/images/I/81kqrwS1nNL.jpg', 158000);


