
export type MediaGenre = '다크 판타지' | 'SF 미스터리' | '서바이벌 스릴러' | '현대 판타지' | '코믹 로맨스' | '사이버펑크';
export type MediaType = '웹소설' | 'PC 패키지 게임' | '극장판 영화' | '콘솔 오픈월드' | '모바일 시뮬레이션';

export interface DimensionLore {
  id: string;
  title: string;
  genre: MediaGenre;
  type: MediaType;
  originNpcIds: string[];
  description: string;
}

export const DIMENSION_REGISTRY: DimensionLore[] = [
  {
    id: 'dim_fantasy_novel_01',
    title: '제국의 검 (웹소설)',
    genre: '다크 판타지',
    type: '웹소설',
    originNpcIds: ['choi_leader'],
    description: '용사가 마왕을 죽이고 모든 것이 끝났으나, 정작 구원받은 세계의 허무함을 견디지 못한 주인공이 탈출한 차원.'
  },
  {
    id: 'dim_sci_fi_game_01',
    title: '프로젝트 에테르 (PC 게임)',
    genre: 'SF 미스터리',
    type: 'PC 패키지 게임',
    originNpcIds: ['kang_leader'],
    description: '완벽한 연산으로 인류의 멸망을 막으려던 AI와 그 제작자의 갈등이 극에 달했던 차원.'
  },
  {
    id: 'dim_survival_movie_01',
    title: '울프 팩 (영화)',
    genre: '서바이벌 스릴러',
    type: '극장판 영화',
    originNpcIds: ['baek_leader'],
    description: '눈보라 치는 고립된 설산에서 늑대 수인 무리가 인간들과 사투를 벌이던 잔혹한 서바이벌 차원.'
  },
  {
    id: 'dim_suspense_manga_01',
    title: '허물 벗는 그림자 (만화)',
    genre: '서바이벌 스릴러',
    type: '콘솔 오픈월드',
    originNpcIds: ['sa_heok_staff'],
    description: '도시의 그늘에서 암살자들이 서로를 잡아먹으며 격을 높이는 피카레스크풍 서사 차원.'
  },
  {
    id: 'dim_modern_novel_01',
    title: '만년 사원의 역습 (웹소설)',
    genre: '현대 판타지',
    type: '웹소설',
    originNpcIds: ['lee_jun_staff', 'park_taewoo_staff'],
    description: '고단한 직장 생활 속에 숨겨진 초능력자들의 암투를 다룬 차원.'
  }
];
