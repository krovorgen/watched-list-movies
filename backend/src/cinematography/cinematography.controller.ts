import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('api/cinematography')
export class CinematographyController {
  @Get('/films')
  getCinematography() {
    return [
      {
        id: 3316502416170699,
        title: 'Человек паук',
        rating: 5,
        linkKinopoisk: 'https://www.kinopoisk.ru/film/838/',
        linkTikTok:
          'https://www.tiktok.com/@rish_art/video/7103834874737478913?is_copy_url=1&is_from_webapp=v1',
        viewed: '2022-06-05T13:57:10.215Z',
        status: 'complete',
        statusText: 'В целом кул',
      },
      {
        id: 3316524161703699,
        title: 'Человек паук',
        rating: 5,
        linkKinopoisk: 'https://www.kinopoisk.ru/film/838/',
        linkTikTok:
          'https://www.tiktok.com/@rish_art/video/7103834874737478913?is_copy_url=1&is_from_webapp=v1',
        viewed: '2022-06-05T13:57:10.215Z',
        status: 'inProgress',
        statusText: '8 серия',
      },
      {
        id: 331650241613699,
        title: 'Человек паук',
        rating: 5,
        linkKinopoisk: 'https://www.kinopoisk.ru/film/838/',
        linkTikTok:
          'https://www.tiktok.com/@rish_art/video/7103834874737478913?is_copy_url=1&is_from_webapp=v1',
        viewed: '2022-06-05T13:57:10.215Z',
        status: 'waiting',
        statusText: 'гавно',
      },
    ];
  }

  @Post()
  createCinematography(@Body() body) {
    return { id: Math.random(), ...body };
  }
}

// одно табло cinematography с type
