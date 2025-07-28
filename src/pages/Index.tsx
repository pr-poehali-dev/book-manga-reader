import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  title: string;
  author: string;
  type: 'book' | 'manga';
  rating: number;
  chapters: number;
  status: 'ongoing' | 'completed';
  genre: string[];
  bookmarked: boolean;
  liked: boolean;
  cover: string;
  description: string;
}

const mockBooks: Book[] = [
  {
    id: 1,
    title: "Война и мир",
    author: "Лев Толстой",
    type: "book",
    rating: 4.8,
    chapters: 15,
    status: "completed",
    genre: ["Классика", "Роман"],
    bookmarked: true,
    liked: true,
    cover: "/img/dfe1d18b-8e26-47e9-a51c-cd2231420223.jpg",
    description: "Эпический роман о русском обществе во времена наполеоновских войн"
  },
  {
    id: 2,
    title: "One Piece",
    author: "Эйитиро Ода",
    type: "manga",
    rating: 4.9,
    chapters: 1100,
    status: "ongoing",
    genre: ["Приключения", "Сёнэн"],
    bookmarked: false,
    liked: true,
    cover: "/img/01c56fd7-e285-4a95-a352-8aa38a4ac241.jpg",
    description: "История о пирате Луффи и его команде в поисках легендарного сокровища"
  },
  {
    id: 3,
    title: "1984",
    author: "Джордж Оруэлл",
    type: "book",
    rating: 4.7,
    chapters: 24,
    status: "completed",
    genre: ["Антиутопия", "Фантастика"],
    bookmarked: true,
    liked: false,
    cover: "/img/36b74c88-4115-4afe-b7f6-a13e8529fdbe.jpg",
    description: "Антиутопический роман о тотальном контроле и наблюдении"
  },
  {
    id: 4,
    title: "Берсерк",
    author: "Кэнтаро Миура",
    type: "manga",
    rating: 4.9,
    chapters: 364,
    status: "ongoing",
    genre: ["Темное фэнтези", "Сэйнэн"],
    bookmarked: true,
    liked: true,
    cover: "⚔️",
    description: "Мрачная история мечника Гатса в жестоком фэнтезийном мире"
  }
];

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [selectedType, setSelectedType] = useState('all');
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [activeTab, setActiveTab] = useState('home');

  const genres = ['Все', 'Классика', 'Фантастика', 'Приключения', 'Сёнэн', 'Сэйнэн', 'Антиутопия', 'Роман', 'Темное фэнтези'];

  const toggleBookmark = (id: number) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, bookmarked: !book.bookmarked } : book
    ));
  };

  const toggleLike = (id: number) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, liked: !book.liked } : book
    ));
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || book.genre.includes(selectedGenre);
    const matchesType = selectedType === 'all' || book.type === selectedType;
    
    return matchesSearch && matchesGenre && matchesType;
  });

  const likedBooks = books.filter(book => book.liked);
  const bookmarkedBooks = books.filter(book => book.bookmarked);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 py-6 font-source">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold font-inter text-foreground">BookHub</h1>
            <Badge variant="secondary" className="text-xs">BETA</Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Sun" size={18} />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-primary"
              />
              <Icon name="Moon" size={18} />
            </div>
            
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Icon name="User" size={18} />
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Icon name="Home" size={16} />
              <span>Главная</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Icon name="User" size={16} />
              <span>Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="collections" className="flex items-center space-x-2">
              <Icon name="Heart" size={16} />
              <span>Коллекции</span>
            </TabsTrigger>
            <TabsTrigger value="reading" className="flex items-center space-x-2">
              <Icon name="BookOpen" size={16} />
              <span>Чтение</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск книг и манги..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('all')}
                >
                  Все
                </Button>
                <Button
                  variant={selectedType === 'book' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('book')}
                >
                  <Icon name="Book" size={16} className="mr-1" />
                  Книги
                </Button>
                <Button
                  variant={selectedType === 'manga' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('manga')}
                >
                  <Icon name="FileImage" size={16} className="mr-1" />
                  Манга
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedGenre(genre)}
                    className="text-xs"
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <Card key={book.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-20 mb-2 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        {book.cover.startsWith('/img/') ? (
                          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-2xl">{book.cover}</div>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(book.id)}
                          className="p-1 h-auto"
                        >
                          <Icon 
                            name="Bookmark" 
                            size={16} 
                            className={book.bookmarked ? 'fill-current text-primary' : 'text-muted-foreground'}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(book.id)}
                          className="p-1 h-auto"
                        >
                          <Icon 
                            name="Heart" 
                            size={16} 
                            className={book.liked ? 'fill-current text-red-500' : 'text-muted-foreground'}
                          />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-lg leading-tight mb-1">{book.title}</h3>
                      <p className="text-muted-foreground text-sm">{book.author}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="fill-current text-yellow-500" />
                        <span className="font-medium">{book.rating}</span>
                      </div>
                      <Badge variant={book.status === 'completed' ? 'secondary' : 'outline'} className="text-xs">
                        {book.status === 'completed' ? 'Завершён' : 'Онгоинг'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {book.chapters} {book.type === 'manga' ? 'глав' : 'глав'}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {book.type === 'manga' ? 'Манга' : 'Книга'}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {book.genre.slice(0, 2).map(genre => (
                        <Badge key={genre} variant="secondary" className="text-xs px-2 py-1">
                          {genre}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full" size="sm">
                      <Icon name="BookOpen" size={16} className="mr-2" />
                      Читать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      АК
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-inter text-xl font-semibold">Александр Книголюб</h2>
                    <p className="text-muted-foreground">Читатель с 2020 года</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-inter text-2xl font-bold text-primary">{books.length}</div>
                    <div className="text-sm text-muted-foreground">Всего книг</div>
                  </div>
                  <div>
                    <div className="font-inter text-2xl font-bold text-primary">{likedBooks.length}</div>
                    <div className="text-sm text-muted-foreground">Понравилось</div>
                  </div>
                  <div>
                    <div className="font-inter text-2xl font-bold text-primary">{bookmarkedBooks.length}</div>
                    <div className="text-sm text-muted-foreground">В закладках</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <h3 className="font-inter font-semibold mb-3">Любимые жанры</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Фантастика', 'Приключения', 'Классика'].map(genre => (
                      <Badge key={genre} variant="secondary">{genre}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-inter text-2xl font-semibold">Ваши коллекции</h2>
              
              <Tabs defaultValue="liked">
                <TabsList>
                  <TabsTrigger value="liked" className="flex items-center space-x-2">
                    <Icon name="Heart" size={16} />
                    <span>Понравилось ({likedBooks.length})</span>
                  </TabsTrigger>
                  <TabsTrigger value="bookmarked" className="flex items-center space-x-2">
                    <Icon name="Bookmark" size={16} />
                    <span>Закладки ({bookmarkedBooks.length})</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="liked" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {likedBooks.map(book => (
                      <Card key={book.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{book.cover}</div>
                            <div className="flex-1">
                              <h3 className="font-medium">{book.title}</h3>
                              <p className="text-sm text-muted-foreground">{book.author}</p>
                            </div>
                            <Icon name="Heart" size={16} className="fill-current text-red-500" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="bookmarked" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookmarkedBooks.map(book => (
                      <Card key={book.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{book.cover}</div>
                            <div className="flex-1">
                              <h3 className="font-medium">{book.title}</h3>
                              <p className="text-sm text-muted-foreground">{book.author}</p>
                            </div>
                            <Icon name="Bookmark" size={16} className="fill-current text-primary" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Reading Tab */}
          <TabsContent value="reading" className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-inter text-2xl font-semibold">Страница чтения</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Book Reading Interface */}
                <Card>
                  <CardHeader>
                    <h3 className="font-inter font-semibold flex items-center">
                      <Icon name="Book" size={20} className="mr-2" />
                      Чтение книги
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="text-4xl">📚</div>
                      <h4 className="font-medium">Война и мир</h4>
                      <p className="text-sm text-muted-foreground">Глава 3 из 15</p>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm leading-relaxed">
                        "Ну, князь, Генуя и Лукка стали не больше как фамильными поместьями Бонапартов. 
                        Нет, я вперед говорю вам, если вы мне не скажете, что у нас война, 
                        если вы еще позволите себе защищать все гадости, все ужасы этого Антихриста..."
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Icon name="ChevronLeft" size={16} className="mr-1" />
                        Назад
                      </Button>
                      <Button size="sm">
                        Далее
                        <Icon name="ChevronRight" size={16} className="ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Manga Reading Interface */}
                <Card>
                  <CardHeader>
                    <h3 className="font-inter font-semibold flex items-center">
                      <Icon name="FileImage" size={20} className="mr-2" />
                      Чтение манги
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="text-4xl">🏴‍☠️</div>
                      <h4 className="font-medium">One Piece</h4>
                      <p className="text-sm text-muted-foreground">Глава 1098 из 1100+</p>
                    </div>
                    
                    <div className="bg-muted aspect-[3/4] rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Icon name="FileImage" size={48} className="mx-auto mb-2" />
                        <p className="text-sm">Страница манги</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Icon name="ChevronUp" size={16} className="mr-1" />
                        Пред. стр.
                      </Button>
                      <Button size="sm">
                        След. стр.
                        <Icon name="ChevronDown" size={16} className="ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reading Settings */}
              <Card>
                <CardHeader>
                  <h3 className="font-inter font-semibold">Настройки чтения</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Размер текста</label>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">A</Button>
                        <Button variant="outline" size="sm">A</Button>
                        <Button variant="default" size="sm">A</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Направление чтения манги</label>
                      <div className="flex space-x-2">
                        <Button variant="default" size="sm">Справа налево</Button>
                        <Button variant="outline" size="sm">Слева направо</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}