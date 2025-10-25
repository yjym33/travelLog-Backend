import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * 사진을 분석하여 자동 태그를 생성합니다.
   * @param imageUrl 분석할 이미지 URL
   * @returns 생성된 태그 배열
   */
  async analyzeImage(imageUrl: string): Promise<string[]> {
    try {
      this.logger.log(`이미지 분석 시작: ${imageUrl}`);

      // 실제 AI 서비스 연동 (예: Google Vision API, AWS Rekognition, Azure Computer Vision)
      // 여기서는 시뮬레이션된 결과를 반환합니다.
      const tags = await this.simulateImageAnalysis(imageUrl);

      this.logger.log(`이미지 분석 완료: ${tags.join(', ')}`);
      return tags;
    } catch (error) {
      this.logger.error(`이미지 분석 실패: ${error.message}`);
      throw new Error('이미지 분석에 실패했습니다.');
    }
  }

  /**
   * 일기 텍스트를 분석하여 감정을 추출합니다.
   * @param diaryText 분석할 일기 텍스트
   * @returns 감정 분석 결과
   */
  async analyzeEmotion(diaryText: string): Promise<{
    emotion: string;
    confidence: number;
    keywords: string[];
  }> {
    try {
      this.logger.log(`감정 분석 시작: ${diaryText.substring(0, 50)}...`);

      // 실제 AI 서비스 연동 (예: Google Natural Language API, AWS Comprehend)
      const result = await this.simulateEmotionAnalysis(diaryText);

      this.logger.log(
        `감정 분석 완료: ${result.emotion} (${result.confidence})`,
      );
      return result;
    } catch (error) {
      this.logger.error(`감정 분석 실패: ${error.message}`);
      throw new Error('감정 분석에 실패했습니다.');
    }
  }

  /**
   * 이미지 분석 시뮬레이션 (실제 구현 시 AI API로 교체)
   */
  private async simulateImageAnalysis(imageUrl: string): Promise<string[]> {
    // 실제 구현에서는 Google Vision API, AWS Rekognition 등을 사용
    await new Promise((resolve) => setTimeout(resolve, 1000)); // API 호출 시뮬레이션

    // 이미지 URL 패턴에 따른 시뮬레이션된 태그 생성
    const url = imageUrl.toLowerCase();
    const tags: string[] = [];

    // 장소 관련 태그
    if (url.includes('mountain') || url.includes('산')) {
      tags.push('#산', '#자연', '#등산');
    }
    if (url.includes('beach') || url.includes('바다') || url.includes('sea')) {
      tags.push('#바다', '#해변', '#자연');
    }
    if (
      url.includes('city') ||
      url.includes('도시') ||
      url.includes('building')
    ) {
      tags.push('#도시', '#건물', '#도시풍경');
    }
    if (
      url.includes('cafe') ||
      url.includes('카페') ||
      url.includes('coffee')
    ) {
      tags.push('#카페', '#커피', '#휴식');
    }
    if (
      url.includes('food') ||
      url.includes('음식') ||
      url.includes('restaurant')
    ) {
      tags.push('#음식', '#맛집', '#요리');
    }

    // 시간 관련 태그
    if (
      url.includes('sunset') ||
      url.includes('노을') ||
      url.includes('sunrise')
    ) {
      tags.push('#노을', '#일출', '#일몰');
    }
    if (
      url.includes('night') ||
      url.includes('밤') ||
      url.includes('evening')
    ) {
      tags.push('#야경', '#밤', '#불빛');
    }

    // 감정 관련 태그
    if (
      url.includes('happy') ||
      url.includes('행복') ||
      url.includes('smile')
    ) {
      tags.push('#행복', '#웃음', '#기쁨');
    }
    if (
      url.includes('peaceful') ||
      url.includes('평온') ||
      url.includes('calm')
    ) {
      tags.push('#평온', '#조용함', '#휴식');
    }

    // 기본 태그 (항상 포함)
    if (tags.length === 0) {
      tags.push('#여행', '#추억', '#기록');
    }

    return tags.slice(0, 5); // 최대 5개 태그
  }

  /**
   * 감정 분석 시뮬레이션 (실제 구현 시 AI API로 교체)
   */
  private async simulateEmotionAnalysis(diaryText: string): Promise<{
    emotion: string;
    confidence: number;
    keywords: string[];
  }> {
    // 실제 구현에서는 Google Natural Language API, AWS Comprehend 등을 사용
    await new Promise((resolve) => setTimeout(resolve, 800)); // API 호출 시뮬레이션

    const text = diaryText.toLowerCase();
    const keywords: string[] = [];

    // 감정 키워드 분석
    let emotion = 'happy';
    let confidence = 0.7;

    if (
      text.includes('행복') ||
      text.includes('기쁨') ||
      text.includes('웃음') ||
      text.includes('즐거')
    ) {
      emotion = 'happy';
      confidence = 0.9;
      keywords.push('행복', '기쁨');
    } else if (
      text.includes('평온') ||
      text.includes('조용') ||
      text.includes('차분') ||
      text.includes('안정')
    ) {
      emotion = 'peaceful';
      confidence = 0.85;
      keywords.push('평온', '조용함');
    } else if (
      text.includes('신남') ||
      text.includes('흥분') ||
      text.includes('재미') ||
      text.includes('놀라')
    ) {
      emotion = 'excited';
      confidence = 0.8;
      keywords.push('신남', '흥분');
    } else if (
      text.includes('그리움') ||
      text.includes('아쉬') ||
      text.includes('추억') ||
      text.includes('과거')
    ) {
      emotion = 'nostalgic';
      confidence = 0.75;
      keywords.push('그리움', '추억');
    } else if (
      text.includes('모험') ||
      text.includes('새로') ||
      text.includes('도전') ||
      text.includes('시도')
    ) {
      emotion = 'adventurous';
      confidence = 0.8;
      keywords.push('모험', '도전');
    } else if (
      text.includes('사랑') ||
      text.includes('로맨틱') ||
      text.includes('달콤') ||
      text.includes('특별')
    ) {
      emotion = 'romantic';
      confidence = 0.85;
      keywords.push('사랑', '로맨틱');
    }

    return {
      emotion,
      confidence,
      keywords: keywords.slice(0, 3),
    };
  }
}
