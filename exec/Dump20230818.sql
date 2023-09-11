-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: i9b209.p.ssafy.io    Database: cartel
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) NOT NULL,
  `post_content` text NOT NULL,
  `post_level` int NOT NULL,
  `post_views` int NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `post_type` int NOT NULL COMMENT '0 - 커뮤니티 글, 1 - 공지사항, 2 - FAQ',
  `post_date` datetime NOT NULL,
  `post_status` int NOT NULL COMMENT '0 - 생성, 1 - 삭제',
  PRIMARY KEY (`post_id`),
  KEY `FK_user_TO_article_1` (`user_id`),
  CONSTRAINT `FK_user_TO_article_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='post_type 0 - 커뮤니티, 1 -공지사항, 2 - QNA';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (20,'수정title!','수정content!',0,6,1,2,'2023-08-08 15:43:43',0),(37,'공지123333','123',0,9,1,1,'2023-08-10 11:27:27',0),(43,'집단 상담 신청 방법 문의','집단 상담 신청하는 방법 알려주세요',0,0,1,2,'2023-08-12 19:54:19',0),(44,'작년부터 계속 우울하고 무기력한데 어떻게 해야할까요?','제가 작년부터 웃음도 잘안나고 계속 무기력하고 바다속 깊이 가라앉히고 있는 느낌..? 억지로 웃어보기도 하고 제가 평소에 좋아하던 것들도 이제는 그냥 다 지루하고 빨리 끝내고 싶다는 생각만 들어요. 놀고있을 때도 애들이 자꾸 무슨일 있냐고 그러니까 억지로 웃고 평소처럼 하려고 하다보니까 원래는 애들한테 놀자고 연락하기도 했었는데 이제는 애들이 놀자고 해도 그때 할게 있어서 안될것 같다면서 핑계 대고 답장도 잘안하고 그래요.. 아무것도 하기가 싫고 유튜브에서 가사 없는 플리 틀어놓고 가만히 있는게 일상이에요 아무것도 하기가 싫어서 무단결석도 했고요 작년 생각이 머릿속에서 안지워져서 자살 생각만 계속 하면서 자해도 해요. 어떻게 해야할까요 너무 힘들어요. 아 추가로 요즘 계속 과수면을 하고 있는데 이것도 어떻게 고치면 좋을까요?',0,0,1,0,'2023-08-12 19:55:20',0),(45,'교회에 가고싶지 않아요','저는 기독교(개신교) 모태신앙이고 종교를 강요받는 한 학생입니다. 저는 예전에 다니던 교회가 너무 싫어서 교회를 바꿨어요. 하지만 바꾼 교회에서도 부모님께서 종교강요를 하셔서 어쩔 수 없이 교회를 다니고 있어요. 왜 어쩔수 없냐면 제가 예전에 교회를 가고싶지 않다고 말을 했더니 심한 신체폭력과 언어폭력을 당했어요. 그래서 가고싶지 않아도 종교를 강요받는 것 같습니다. 매주 일요일이 무서워 지는 것 같네요..',0,0,1,0,'2023-08-12 19:55:44',0),(46,'내성적인 성격으로 어려움','친구들과 있을 때는 밝고 활발하게 의사표현이 가능한데 친하지 않는 사람들과 있을 때는 능력치를 잘 발휘하지 못 하고 식당에서 모르는 분을 부르는 게 쑥쓰럽기도 합니다. 다른 친구는 쾌활해서 선생님들이 좋아하시는 성격 같은데 저도 그렇게 쿨하고 상대방이 좋아할 수 있는 편안한 성격을 가지고 싶어요. 조언을 구하고 싶습니다. 어떻게 할까요?',0,0,1,0,'2023-08-12 19:57:07',0),(47,'싸웠는데 보고 솔직하게 말해주세요','오래된 친구랑 싸웠어요\n저는 서운한게 있으면 참고 넘어가는 타입이여서\n평소에 서운한게 쌓이다가 최근에 좀 커졌어요\n\n평소에 지내면서 답장이 잘 안오고\n연락을 해도 자기할말만 하고 뚝끊기는 느낌? 이 항상 연락할때마다 있었어요\n근데 계속 스토리 올라오고 다른애들이랑 연락하는거 올릴때마다 너무 서운했었어요\n그리고 이 친구가 가끔 밥먹거나 어딜갈때 일단을 저랑 약속을 잡아두고 다른 친구가 시간이 된다고 하면\n그친구랑 가겠다며 약속을 취소하는것도 자주있었고요\n\n그래서 이친구가 나를 필요할때만 찾나? 싶어서 서운했던게 많았는데\n진짜 친구는 필요할때 찾는게 진짜 친구라 생각하면서 넘어갔었어요\n\n근데 갈수록 심해지니까 너무 서운해서 일주일 전쯤에 스토리에 그 친구만 볼수있겠끔 이런이런일이 있었는데 너무 속상하다\n이런식으로 올렸는데 그 친구가 자기 이야기 같았나봐요\n\n혹시 자기이야기냐\n왠지 자기이야기 같아서 신경쓰인다. 난 진짜로 너 소중한데 ... 뭐 이런식으로 장문으로 왔었는데\n그거 보니까 기분이 풀렸어요. 오히려 좀 미안한 느낌이 들어서... 그래서 \'그거 너 아니라고 너도 조금 서운하긴 했는데 그정돈 아니였다\' 하고 넘어갔어요\n\n그래서 그 이후에는 이친구도 조금 노력하겠지 싶었는데 전혀 아니더라고요. 바뀌지 않았어요 하나도\n\n그래서 서운한게 커지고 커졌는데 연락을해도 답장은 안오니까 연락할 방법이 없었어요\n그래서 스토리에 흔히 말해 저격을 올렸죠\n유치한거 알지만 연락이 안되니 서운하다는걸 표현할 방법도 없으니까 그친구만 볼수있겠끔 올렸어요\n\n자기 이야기인거 알아차릴줄 알았는데 그걸 보고도 답장이 없길래\n왜 서운하게 연락이 안되냐고 보냈더니\n알람 꺼놨다고 메세지로 보내래요\n솔직히 거짓말 같았지만 메세지 보냈는데 그것조차 씹혔어요\n근데 그 친구가 실수로 올린 사진에 그 말이 거짓말이였다는 증거가 확실히 있는걸 보고 너무 화나서 어제 단도직입적으로 말을했고 그래서 싸우게 되었어요\n\n그친구 입장은 아무리 그래도 어떻게 우리사이에 유치하게 저격을 올리냐\n그리고 전에 내가 먼저 물어봤을때 솔직히 말했거나\n저격같은거 올리지말고 너가 직접 물어봤어야지\n이런 입장이였고\n\n제 입장은 연락을 하면 답이 안오는데 내가 어떻게 너한테 연락을 하냐\n그래서 그렇게 너만 볼수있게 올린거다\n\n어제 몇시간동안 말을해도 해결 하나도 안되고\n대충 마무리짓고 끝냈어요\n\n근데 너무 찝찝해요...\n대화를 하면할수록 제가 다 잘못한 사람이 되어있었어요\n솔직히 제가 조금 감정적으로 저격글을 썼었던건 맞아요\n그게 많이 충격적이였고 어떻게 그런말을 하냐. 너가 어떻게 그럴수가있냐\n이런식으로 친구가 계속 나와서 계속 미안해만 말하다가 끝났어요\n\n난 이걸 원한게 아닌데... 나 진짜로 이때까지 상처받은게 쌓이고 쌓아오면서 오랫동안 참아왔는데\n그게 터지면서 했던 말 하나로\n한순간에 제가 너무 잘못한 사람이 되어있었고\n진짜로 다 말할려고 마음먹은 어제도\n서운했던거 다 말하지 못하고 미안해미안해만 반복하다가 끝난게 너무 속상해요\n\n지금 걔는 \'난 너한테 실망했고 너가 한 말에 상처받았어. 서운했다고 느꼈으면 미안하긴해 근데 지금 이 상황은 다 너가 만든거야\'\n\n이런느낌이고 제가 계속 매달리고 있어요\n\n너무 당황스럽고 짜증나요\n이미 정이 떨어졌지만 끝내기에는 너무 억울해서 그런지 아님 정이 아직 있어서 미련이 남은건지 계속 저자세로 붙잡게 되고\n\n이젠 계속 서운하게 행동한 그 친구의 잘못이 큰지\n그렇다고 저격글 올린 제가 더 잘못이 큰지 헷갈려요\n\n제가 상처받을만한 말 올린건 사실이니 제가 계속 용서를 구해야할까요\n아니면 풀지 못하고 나쁜놈으로 남더라도 끝내야할까요?\n\n아 너무 복잡하고 혼란스러워서 정리가 안되서 미칠거같아요',0,0,1,0,'2023-08-12 19:57:35',0),(48,'알바에 대한 고민이 생겼습니다 ㅜ','아동복 매장에서 알바를 하고 있는데요 제가 유도리가 없는 탓인지 오늘 소수의 손님이 오셔도 결국 옷을 판매하지 못 했습니다 ㅜ 이곳이에서 알바를 한지 이제 6개월이 넘었는데요 이제는 매장 매출이 안나오면 아무리 알바생일지라도 제가 다 스트레스를 받더라구요ㅠ 주말에는 무조건 십단위의 두 자리 수 매출이 나왔는데 오늘따라 옷을 너무 못 팔아서 계속 불안함과 죄책감이 들어요ㅠ.. 딱히 잘한건 없지만 힘이라도 내고싶어서요ㅜ 이 글을 읽어주시고 짧은 말씀이라도 부탁드려도될까요?',0,1,1,0,'2023-08-12 19:57:50',0),(49,'왜 살아야하는지 모르겠어요','저는 19살 고3 학생입니다.\n저는 제가 왜 살아야하는지 모르겠어요\n저는 혈우병, 사시, 편마비 때문에 불편한 오른손, 뇌출혈로 인한 수술자국, 우울증, 분노조절장애 등이 있습니다.\n그리고 아버지는 제가 7살 때 돌아가시고 외가에서는 아버지 관련해서 안 좋은 얘기도 많이 하셨고 그런 얘기를 들을 때마다 너무 속상하고 짜증났습니다.\n또 가족들은 저의 혈우병에 대해 이해를 해주지 않습니다.\n혈우병을 외할아버지한테 물려 받았는데 외할아버지는 제가 태어나기 전에 돌아가시고 가족 중에 아픈 사람 한명 없는데 저 혼자 불편한 곳 많으면 이해를 해 줄 수도 있는데 할아버지는 종양이 있어서 종양 제거 할 때 빼고는 거의 팩터를 맞지 않으셨다고 말씀 하시면서 너는 왜그러냐고 짜증을 내시고 사시는 수술 하고 싶어도 혈우병 때문에도 있고 뇌출혈이 발생 했을 때 안압이 상승해서 수술을 3~4번 정도 해야하고 수술을 하더라도 다시 사시가 생길 수 있다는 말에 결국 수술을 포기 했습니다.\n뇌출혈 때문에 오른쪽 편마비가 왔었는데 재활을 한 번도 단 한 번도 해본적이 없습니다.\n이런 육체적으로 힘든 것만 있어도 살기 버거운데 정신적으로는 우울증, 분노조절장애가 있다는게 참 서럽고 힘듭니다.\n제가 21년도 12월 21일에 정신병원에 입원을 해서 23년도 1월 6일 날 퇴뤈을 했습니다.\n지금도 꾸준히 약도 먹고 외래진료도 다니고 있고 구청 정신건강복지센터에서도 상담을 받고 있고 정말 힘들 때는 1393에 전화도 합니다.\n그래도 전혀 나아지지 않고 오히려 더 심해지는 것같습니다.\n더도 살고 싶은 마음도 있고 저에게 정말 큰 힘이 되고 옆에 있어 주는 것만으로도 살아갈 수있지만 위에서도 말 했던 것처럼 혈우병, 사시 ,편마비, 수술자국, 우울증, 분노조절장애 이런것들 때문에 그리고 이해해주지도 못하면서 오히려 스트레스만 주는 외가댁 때문에 너무 괴롭습니다.\n정말 제가 죽어서 아버지 곁으로 가는게 좋을까요?\n그러면 남은 가족들은 소리만 지르고 짜증내고 막말하는 제가 없어서 좋아할 것같아요',0,0,1,0,'2023-08-12 19:58:15',0),(50,'왜 다른사람과 같이 있는게 불편한지 모르겠어요.','현재 중학교 재학중인 학생입니다. 코로나 있기 전까진 그래도 친구도 잘 사귀고 지금처럼 많이 불편하지 않았습니다. 그런데 코로나가 터지고 난 뒤 부터 친구나 다른사람을 만날 일이 적어지고, 집에만 있다 보니 점 점 더 사람과 같이 있는 것만으로도 불편함을 느끼고 있습니다. 그래서 그런지 친구도 없고, 말도 거의 없어져서 \"대답 좀 해라, 답답하다, 같이 있으면 재미가 없다, 자신감좀 키워라.\" 등등 여러 말을 들었습니다. 약 3년동안 그렇게 살고 그런 말들을 들으니 다른사람과 대화를 잘 해야 한다는 부담감이 생긴거 같습니다. 3년동안 살다가 \'나는 왜 사람과 같이 있는게 불편하지?\' 라는 궁금증이 얼마전 에 생겼는데, 아무리 생각해봐도 왜 불편한지 모르겠습니다. 단지 그 부담감 때문일까요..?',0,0,1,0,'2023-08-12 19:58:26',0),(51,'아무것도 안해도 힘들고 지쳐있어요.','무언가 할 마음도 들지 않고 내가 누구인지 내가 왜 무엇을 해야하는지 내가 왜 살아가야하는지 조차 궁금증이 늘 들게됩니다.\n다른 사람들은 늘 제게 상담을 요청해 오죠.\n제가 이야기를 듣고 작은 방법을 찾는것을 도와주면 좋아해줬으니까요. 반대로 저는 그런 성격이 아니에요. 누군가를 위해 이야기를 들어줄 수는 있지만 저에 대한 이야기는 하지 않아요. 할 수 없었다가 맞겠죠.\n이런 시간들이 계속 이어지고 내 이야기는 가족 들 조차도 말하지 못해요.\n그들 조차 내게 기대오거든요. 내게 이야기 하고 편해지길 원하니까요.\n계속 시간들이 지나니까요.. 나는 나에 대해서 더 모르겠는거에요.\n가끔 엄청 힘들 때 가 있어요 그 순간 조차도 누구에게 말 할 수 있는 용기조차 없고 그냥 속내에 묻어두고 있습니다.\n계속 이러니까.. 아무것도 안해도 지쳐버리는 날 발견했어요. 잠이 엄청 늘어나고.. 혹은 몇일동안 자지 못하거나 잠에 들려면 몇시간이 걸리더라구요. 이젠 나에 대해 생각을 하면 심장이 아프다는 느낌 까지 들어버립니다. 누가 이야기 해주길 제가 저를 너무 힘들게 하고 있는거 같대요 저는 모르겠네요...\n가끔씩 드는 생각인데 내가 나를 포기해버리고 싶어요.. 그럼 편해질꺼같아서. 아침에 눈을 안뜨고 그대로 죽어버리는 상상조차 듭니다 그러면 좋을꺼같아서.\n\n어떻하면 내가 조금이라도 좋아질까요? 저 좀 도와주세요.\n처음이자 마지막으로 용기내서 글 올려봅니다.',0,0,1,0,'2023-08-12 19:58:38',0),(52,'시험이 무섭습니다.','중고등학교 때부터 시험공부를 하면 공부한 것에 비해 점수가 잘 나오지 않아 늘 스트레스를 받았습니다. 주변 사람들은 이런 저를 제대로 도와준 적이 없었습니다. 제 또래 아이들은 저를 비웃기 일쑤였고 선생님은 답답해하기만 하셨고 부모님들께서는 짜증만 내셨습니다.\n그리고 언제부턴가 시험을 보기가 싫어지고 저절로 공부가 하기 싫어졌습니다. 저 자식은 공부해도 안된다는 말이 듣기 싫었는지 아니면 시험의 긴장이 너무 싫은건지 아니면 부족한 자기자신을 마주보는게 싫은건지 정말이지 잘 모르겠습니다.\n내일 한국사 시험인데 솔직히 공부를 하나도 안했습니다. 부모님의 강요로 어쩔 수 없이 한 것이기도 하고 요즘 너무 우울함과 무기력이 심해져서 아무것도 안하고 싶었습니다.\n',0,0,1,0,'2023-08-12 19:58:50',0),(53,'사람들과 대화하기 어려워요','원래도 말 수가 많은 편은 아닌 성격이지만\n그래도 원만하게 잘 지냈었다고 보는데\n일을 하면서 직장 사람들한테 데이고\n통수 당하고 감정쓰레기통 취급받고\n그러다 자존감도 많이 깎이고\n너무 인간관계에 지치고 말 섞기도 싫고\n아무것도 하기 싫더라고요\n그래서 왠만한 주소록에 저장된 사람들\n직장이건 친구건 주변 사람들 다 정리하고\n연락 안하고 칩거생활을 한지 1~2년 정도 된 것 같아요\n요근래 밖에 간간히 나가기 시작했는데\n사람 마주치기 힘들기도 하고\n마주쳐도 가슴이 쿵쾅대면서 긴장되고 땀이 막 나요\n상대방이 말을 걸어도 단답으로 말을 하게되고\n다른 말이나 이어갈 주제같은 것도 떠오르지도 않아요\n이어나갈 생각도 안들고 먼저 대화해볼 생각도 안들고요\n말을 해도 버벅거리는 것 같고\n목소리도 작아 안들린다고 하고말을 잘 못하겠어요\n가족들이랑도 각자 바쁘니 따로 보면서 대화를 많이 하진 않아요',0,0,1,0,'2023-08-12 19:59:05',0),(54,'나홀로집에','어릴때부터 영화 나홀로집에를 많이봐서 그런가??ㅋㅋ친구가 없으니 항상 나홀로집에 있는데.. ㅠㅠ 심심하면서 외롭네ㅠㅎ',0,0,1,0,'2023-08-12 19:59:27',0),(55,'정신과 약에 거부반응 심해요','약 먹으면 무섭고 현실 회피하고 싶어요',0,1,1,0,'2023-08-12 21:07:49',0),(56,'남편과의 사이','안녕하세요 전 재혼한지 거이 2년된 여성입니다 남편과으 대화가 이어지지 않습니다 남편은 내가 뭘 물어보면 짜증을 내서 대화할수가 없습나다 그런데 제가 남편과 헤여질 용기가 안납니다 어떻게 하면 될까요?남편이 다른사람들 앞에서 저한테 죽은듯이 있으라고 해서 휴가가서 다투고 집에 와서는 일주일 동안 말을 안하고 있습니다 집에 와서도 제가 잘못했다고 빌었어요 지금 우리 가정 깨고 싶지 안습나다 내가 먼저 잔소리를 한건 맞는데 남편이 다른사람앞에서 그렇게 말하니깐 서운햤습니다 근데 남편이 짜증이 많고 늘 저를 서운하게 하는데 전 화는 나는데 계속 우리리 사이 이어나가고 싶어요 제가 정신상태가 문제가 있는걸까요?',0,1,1,0,'2023-08-12 21:08:08',0),(57,'독립이방법일까요?','하나하나 전부 간섭하고화풀이 하는 엄마랑같이살아야하나요,집에서 새를키우는데\n독립할수없거든요\n몸도제가약하고 어찌할까요?',0,1,1,0,'2023-08-12 21:08:20',0),(58,'조울증인 것 같기도 하고 잘 모르겠어요','가끔씩 아르바이트를 하다가 갑자기 눈물이 막 쏟아질 것 같아요. 정말 못참겠는 날엔 화장실 가서 울고 오기도 하구요. 그리고 사람들이 저를 싫어할까봐 무서워요. 말이 솔직하고 직설적인 편이라 선 넘을 때가 있는 것 같기도 하고 잘 모르겠어요. 직설적인 성격을 고치고 싶어요.\n또 밤만 되면 이유 모를 우울감에 휩싸여요. 이유가 뭔지도 모르겠고 그냥 눈물이 날 것 같고 그냥 혼자서 이불 뒤집어쓰고 울 때도 있어요. ￼\n제가 미래에 뭘 하고 싶은 지도 모르겠어요. 그냥 흘러가는 데로 사는 것 같아서 너무 대책 없다고 느껴지기도 하고요. 막상 취미생활을 하려고 해도 귀찮고 아무것도 하기가 싫어요',0,5,1,0,'2023-08-12 21:08:46',0),(60,'환불 문의','환불 좀용',0,0,1,2,'2023-08-12 21:37:08',0),(61,'상담사 교체 가능 ?','상담사 이상한데 교체좀 시켜줘요',0,1,1,2,'2023-08-12 21:39:14',0),(63,'결제 완료는 어떻게 확인할 수 있나요?','결제 완료는 어떻게 확인할 수 있나요?',0,1,1,2,'2023-08-12 21:44:28',0),(64,'해외에서도 상담 가능한가요?','해외에서도 상담 가능한가요?',0,7,1,2,'2023-08-12 21:46:16',0),(73,'마약하고 롤스로이스타다가 사고 쳤습니다....','케타민과 프로포폴을 병원에서 투여하고 취한상태에서 롤스로이스 차량을 몰다가 지나가던 여자를 들이 박았습니다. 박고나서 정신을 차리지 못했고 이 현실을 회피하기위해 도망쳤습니다. ',0,9,1,0,'2023-08-14 09:16:45',0),(80,'제목','내용',1,0,1,0,'2023-08-14 12:27:16',0),(82,'당신을 사랑했습니다.','너무 힘들어요 ......',0,0,1,0,'2023-08-14 16:37:47',0),(83,'안녕하세요','내용15',1,0,1,0,'2023-08-15 10:31:19',0),(84,'안녕하세요','내용16',1,0,1,0,'2023-08-15 14:06:41',0),(85,'안녕하세요','내용16',1,0,1,0,'2023-08-15 14:08:48',0),(86,'안녕하세요','내용16',1,0,1,0,'2023-08-15 14:10:00',0),(87,'안녕하세요','내용16',1,0,1,0,'2023-08-15 14:12:42',0),(88,'안녕하세요','내용16',1,0,1,0,'2023-08-15 14:24:38',0),(89,'안녕하세요','댓글 테스트 해보고 싶습니다만',0,0,32,0,'2023-08-16 15:44:17',0),(91,'123','123',0,0,13,0,'2023-08-17 13:33:27',0),(92,'관리자입니다.','관리자입니다. 여러분 좋은글 부탁드립니다.',0,0,11,0,'2023-08-17 15:32:23',0);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `career`
--

DROP TABLE IF EXISTS `career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `career` (
  `career_id` int NOT NULL AUTO_INCREMENT,
  `career_content` varchar(255) DEFAULT NULL,
  `career_state` int DEFAULT '0' COMMENT '0- 등록 1- 삭제',
  `counselor_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`career_id`),
  KEY `FK_counselor_TO_career_1` (`counselor_id`),
  CONSTRAINT `FK_counselor_TO_career_1` FOREIGN KEY (`counselor_id`) REFERENCES `counselor` (`counselor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `career`
--

LOCK TABLES `career` WRITE;
/*!40000 ALTER TABLE `career` DISABLE KEYS */;
INSERT INTO `career` VALUES (1,'현) 내일을 만드는 심리상담연구소 대표 / 심리상담사',0,1),(2,'현) 단국대학교 자유교양대학 진로교과 초빙교수',0,1),(3,'현) 10년차 심리상담사, 심리상담, 심리검사 진행 등 심리상담사로 활동중',0,1),(4,'현) 공공기관, 대학교 등 관련기관에서 일과 진로 관련 강의, 대화법, 부모교육 등과 관련하여 강사로 활동중',0,1),(5,'전) 단국대학교 교육대학원 상담심리전공 강사',0,1),(6,'전) 한국상담심리학회 소속 분회 간사',0,1),(7,'전) 한국교육개발원 집단상담 강사',0,1),(8,'전) 유해피심리상담센터 수원점 심리상담사',0,1),(9,'전) 국제대학교 상담연구원',0,1),(10,'전) 단국대학교 대학생활상담센터 특별상담원',0,1),(11,'전) 안양보호관찰소 특별범죄예방위원',0,1),(12,'전) 군포시청소년상담복지센터 시간제 청소년동반자 (심리상담사)',0,1),(13,'전) 오산시청소년상담복지센터 전일제 청소년동반자 (심리상담사)',0,1),(14,'여성의 전화 쉼터 자문위원',0,2),(15,'대한의사협회 편집위원',0,2),(16,'발달장애아 치료교육학회 학술이사',0,2),(17,'대한 소아청소년 정신과학회 학술부장',0,2),(18,'대한 신경정신과학회 정회원',0,2),(19,'연세대학교 의과대학 세브란스병원 수련의',0,2),(20,'연세대학교 의과대학 세브란스병원 정신과 전공의',0,2),(21,'서울 삼성병원 소아청소년 정신과 전임의 및 임상교수',0,2),(22,'아주대학교 교육대학원 특수교육학과 주임교수',0,2),(23,'아주대학교 의과대학 정신과 교수',0,2),(24,'연세대학교 의과대학 정신과학 외래교수',0,2),(25,'허그맘 · 허그인 심리상담센터 강남본점 부원장 / 강동점 원장',0,3),(26,'로뎀심리상담센터 임상심리사',0,3),(27,'강서구, 고양시 정신건강증진센터 그룹프로그램',0,3),(28,'군의문사 진상규명위원회, 진정인 상담 및 PTSD 연구',0,3),(29,'마음사랑인지행동치료센터 익스턴 과정 수료',0,3),(30,'마음누리 클리닉 임상심리사',0,3),(31,'관동대학교 의과대학 명지병원 임상심리전문가과정 수련',0,3),(32,'중앙대학교 의료원 신경정신과, 병동 그룹 프로그램',0,3),(33,'현)서울사이버대학교 상담심리대학원 겸임교수',0,4),(34,'현)GB 글로벌 이노에듀 교강사',0,4),(35,'현)마주하기 상담연구소, 소장',0,4),(36,'분당 내 마음 정신과, 임상심리전문가',0,4),(37,'국무총리 산하, 청소년 위원회 & 청소년 종합지원 센터 연구원',0,4),(38,'용인정신병원, 임상심리 수련 레지던트 과정 3년 수료',0,4),(39,'삼성해밀 소아 청소년의학과 임상심리전문가',0,4),(40,'해수 소아 청소년학의학과 임상심리전문가',0,4),(41,'허그맘허그인 성수, 서초, 중구, 원장',0,5),(42,'한신플러스케어 센터장',0,5),(43,'반포복지관 놀이치료사',0,5),(44,'조소연 신경정신과 놀이치료사',0,5),(45,'아름아동심리상담센터 부소장',0,5),(46,'새길아동청소년상담센터 상담연구원',0,5),(47,'한국인지과학연구소 팀장',0,5),(48,'현)국방부 육군부대 방영생활전문 상담관',0,6),(49,'현)행복심리센터 (주)밝음 전문상담사 / EAP컨설턴트',0,6),(50,'강서구청소년상담복지센터 시간제 청소년동반자',0,6),(51,'영등포구청소년상담복지센터 전일제 청소년동반자',0,6),(52,'서울예술심리상담센터강사',0,6),(53,'서대문구 청소년상담복지센터 임상심리사',0,7),(54,'강남구 청소년상담복지센터 청소년동반자',0,7),(55,'도봉구 청소년상담복지센터 임상심리사 및 상담사',0,7),(56,'현) 서초구 가족센터 상담사',0,8),(57,'현) 강서구 가족센터 상담사',0,8),(58,'현) 심리상담연구소 앤아더라이프 상담사',0,8),(59,'현) 성모채움 정신건강의학 심리상담사',0,9),(60,'전)서울서부지검 범죄피해자 지원센터 대외협력위원 및 심리상담',0,9),(61,'전)허그맘허그인 심리상담센터 심리상담사',0,9),(62,'전)구성 심리상담센터 임상심리사',0,9);
/*!40000 ALTER TABLE `career` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `client_attendance` int NOT NULL DEFAULT '0',
  `client_state` int DEFAULT '0' COMMENT '0 - 상담 시작 전, 1- 상담 진행중 2- 상담 종료, 3 상담 취소',
  `user_id` int NOT NULL DEFAULT '0',
  `counsel_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`client_id`),
  KEY `FK_user_TO_client_1` (`user_id`),
  KEY `FK_counsel_TO_client_1` (`counsel_id`),
  CONSTRAINT `FK_counsel_TO_client_1` FOREIGN KEY (`counsel_id`) REFERENCES `counsel` (`counsel_id`),
  CONSTRAINT `FK_user_TO_client_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,0,1,2,1),(5,0,1,7,1),(6,0,1,3,1),(7,0,1,1,2),(8,0,1,2,2),(9,0,1,2,2),(10,0,1,2,2),(11,0,1,2,3),(12,0,1,2,3),(14,0,1,2,3),(15,0,1,2,3),(16,0,1,2,3),(17,0,1,11,4),(18,0,1,50,4),(19,0,1,30,5),(20,0,1,7,5),(21,0,1,7,5),(22,0,1,3,6),(23,0,1,8,6),(24,0,1,8,6),(26,0,1,64,6),(27,0,1,63,7),(28,0,1,30,7),(29,0,1,30,7),(30,0,0,3,1),(31,0,0,62,1),(32,0,0,3,1);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_content` text NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `comment_date` datetime NOT NULL,
  `comment_state` int NOT NULL COMMENT '0-등록, 1- 삭제',
  `post_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_id`),
  KEY `FK_user_TO_comment_1` (`user_id`),
  KEY `FK_article_TO_comment_1` (`post_id`),
  CONSTRAINT `FK_article_TO_comment_1` FOREIGN KEY (`post_id`) REFERENCES `article` (`post_id`),
  CONSTRAINT `FK_user_TO_comment_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (15,'댓글작성1',1,'2023-08-14 12:24:58',0,20),(19,'fgsdfghhsedh',11,'2023-08-14 15:21:01',0,20),(23,'ㅇㄴㅁㄹㄴㅇㄻㅇㄹ',11,'2023-08-14 15:24:29',0,20),(24,'ㅁㄴㅇㄻㄴㅇㄹ',11,'2023-08-14 15:25:55',0,20),(25,'댓글작성1',1,'2023-08-14 15:27:06',0,20),(28,'댓글작성1',1,'2023-08-14 15:41:22',0,20),(29,'ㄱ쇼ㅕㅁㄴㅇㄻㅇㄻㅇㄹ',11,'2023-08-14 15:42:44',0,80),(30,'안녕하세용',11,'2023-08-14 15:43:08',0,80),(31,'ㄴㅁㄹㄴㅇㄹ',11,'2023-08-14 15:43:17',0,80),(32,'댓글작성1',1,'2023-08-14 15:44:04',0,20),(33,'댓글작성123',1,'2023-08-14 15:50:19',0,20),(34,'ㄷㄱㅎㄻㄴㅇㄹㄴ',11,'2023-08-14 15:54:54',0,80),(37,'ㅣㅈ다ㅓ힞ㄷ가ㅓㅎㄷ',11,'2023-08-14 16:41:12',0,82),(38,'ㅁㄴㄹㄴㅇㄹ',11,'2023-08-14 16:41:21',0,82),(39,'dkssyd',11,'2023-08-14 16:43:47',0,82),(40,'test댓글5',1,'2023-08-14 19:54:34',0,20),(41,'하이',1,'2023-08-15 14:22:18',0,20),(42,'하이1',1,'2023-08-15 14:26:08',0,20),(43,'댓글작성1',1,'2023-08-16 15:56:59',0,20),(47,'ㅁㄴㅇㄹㄴㅁㄹ',11,'2023-08-16 16:01:08',0,89),(48,'ㅁㄴㅇㄹㄴㅁㄹㅁㄴㅇㄹㄴ',11,'2023-08-16 16:01:28',0,89),(49,'ㄴㅇ',11,'2023-08-16 16:02:13',0,89),(50,'sdsf',11,'2023-08-16 16:40:49',0,80),(51,'안녕',11,'2023-08-17 13:34:57',0,86);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consulting`
--

DROP TABLE IF EXISTS `consulting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulting` (
  `consulting_id` int NOT NULL AUTO_INCREMENT,
  `consulting` text NOT NULL,
  `consulting_date` datetime NOT NULL,
  `curriculum_id` int NOT NULL DEFAULT '0',
  `client_id` int NOT NULL DEFAULT '0',
  `consulting_state` int NOT NULL COMMENT '0 - 등록, 1 - 삭제',
  PRIMARY KEY (`consulting_id`),
  KEY `FK_curriculum_TO_consulting_1` (`curriculum_id`),
  KEY `FK_client_TO_consulting_1` (`client_id`),
  CONSTRAINT `FK_client_TO_consulting_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `FK_curriculum_TO_consulting_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculum` (`curriculum_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulting`
--

LOCK TABLES `consulting` WRITE;
/*!40000 ALTER TABLE `consulting` DISABLE KEYS */;
INSERT INTO `consulting` VALUES (1,'긍정적인 변화를 느꼈음, 자신감 상승','2023-08-17 09:36:17',1,5,0),(2,'추가적인 상담이 필요해 보임','2023-08-17 09:36:17',1,1,0),(3,'상태가 많이 호전되었음','2023-08-17 09:36:17',1,1,0),(4,'불안 완화, 긍정적인 전망 획득','2023-08-17 09:36:17',1,5,0),(5,'스트레스 감소, 집중력 향상','2023-08-17 10:12:41',1,5,1),(6,'꾸준한 노력으로 성취감 높아짐','2023-08-17 10:23:51',1,5,0),(7,'관계 문제에 대한 대화로 해소','2023-08-17 10:28:59',1,5,1),(8,'자기자신에 대한 이해 깊어짐','2023-08-17 10:29:21',1,7,1),(9,'자기존중감 회복, 자유로워짐','2023-08-17 10:30:13',1,6,1),(10,'과거에 갇혀있던 감정 해방','2023-08-18 00:11:27',1,5,0),(11,'자발적인 자기계발 시작','2023-08-18 00:11:38',1,5,0),(12,'자기치유 능력 발견, 감사함 느낌','2023-08-18 00:11:58',1,5,0),(18,'좋은 시간이었습니다.','2023-08-18 01:11:48',1,5,0),(19,'좋은 시간이었습니다.','2023-08-18 01:12:12',1,5,0),(20,'좋은 시간이었습니다.','2023-08-18 01:12:16',1,5,0),(21,'밀싸피님','2023-08-18 02:04:42',3,27,0),(22,'미싸피님','2023-08-18 02:04:42',3,26,0),(23,'미싸피 소감문','2023-08-18 02:26:35',3,26,1),(24,'좋은 시간이었습니다.','2023-08-18 02:27:10',3,26,1);
/*!40000 ALTER TABLE `consulting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counsel`
--

DROP TABLE IF EXISTS `counsel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counsel` (
  `counsel_id` int NOT NULL AUTO_INCREMENT,
  `counsel_start_date` date NOT NULL,
  `counsel_end_date` date NOT NULL,
  `counsel_count` int NOT NULL,
  `counsel_title` varchar(50) NOT NULL,
  `counsel_state` int NOT NULL COMMENT '0- 상담 시작 전, 1- 상담 진행중, 2- 상담 종료, 3- 상담 취소',
  `counsel_client_count` int NOT NULL,
  `counsel_price` int NOT NULL,
  `counselor_id` int NOT NULL DEFAULT '0',
  `counsel_introduction` text NOT NULL,
  `counsel_week_count` int NOT NULL,
  `counsel_min_client` int NOT NULL,
  `counsel_max_client` int NOT NULL,
  PRIMARY KEY (`counsel_id`),
  KEY `FK_counselor_TO_counsel_1` (`counselor_id`),
  CONSTRAINT `FK_counselor_TO_counsel_1` FOREIGN KEY (`counselor_id`) REFERENCES `counselor` (`counselor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counsel`
--

LOCK TABLES `counsel` WRITE;
/*!40000 ALTER TABLE `counsel` DISABLE KEYS */;
INSERT INTO `counsel` VALUES (1,'2023-08-28','2023-09-22',3,'당신은 사실 강하다.',0,0,80000,1,'불안을 해결 할 수 있는 방법은 진짜 나를 알아가고, 내가 원하는 인생을 설계하며, 작은것부터 실천하고 이루어 가는 것입니다. 내 삶에, 내 고민에는 반드시 내가 있어야 합니다. 인생설계 프로젝트를 통해 이제부터 나를 알아가고 인정하고 지지해주는 멋진 삶을 만들어 보아요.',1,2,10),(2,'2023-08-28','2023-09-22',3,'당신은 약하지 않아요.',0,0,70000,2,'당신은 이미 많은 도전과 어려움을 이겨내며 지금까지 왔습니다. 제 곁에서 당신의 이야기를 듣고, 함께 감정을 나누며, 그리고 긍정적인 변화를 이끌어내는 데 도움을 줄 준비가 되어 있습니다. 제가 제공하는 상담은 단순한 조언이나 해결책을 주는 것이 아닙니다. 저와 함께하는 시간은 당신의 내면을 탐색하고, 감정을 받아들이며, 자신을 다시 발견하는 여정의 시작입니다.',1,2,10),(3,'2023-08-28','2023-09-22',3,'스트레스 관리와 정서조절',0,0,80000,3,'일상생활의 다양한 압박과 스트레스로 인해 감정이 어려운 상황에 처하셨나요? 제 소중한 클라이언트분께서는 스트레스를 관리하고 감정을 조절하는 방법을 함께 찾아보는 상담을 제공해드립니다. 함께 해결책을 찾아가며 더 건강하고 긍정적인 삶을 향해 나아갈 수 있도록 도와드릴게요.',1,2,10),(4,'2023-08-28','2023-09-22',3,'대인관계와 커뮤니케이션',0,0,100000,4,'우리 삶의 큰 부분은 대인관계와 커뮤니케이션에서 비롯됩니다. 서로의 감정을 이해하고 상호작용하는 방법을 개선하여 더 풍요로운 관계를 구축하고 싶으신가요? 제가 여러분을 돕고자 합니다',1,2,10),(5,'2023-08-28','2023-09-22',3,'자아 발전과 자기성장',0,0,100000,5,'어떤 어려움이든, 그 안에는 당신만의 강점과 빛이 있습니다. 이 상담은 당신의 내면을 자세히 들여다보며, 자신을 이해하고 받아들이는 과정을 안내합니다. 함께 여행하는 동안, 새로운 관점을 얻고 자신의 성장을 위한 도구를 습득할 수 있을 것입니다.',2,2,10),(6,'2023-08-28','2023-09-22',3,'자존감 강화와 긍정적 사고',0,0,80000,6,'자신을 사랑하고 믿는 것은 가장 중요한 일 중 하나입니다. 자존감을 높이고 부정적인 생각을 극복하여 더 행복하고 자신감 넘치는 삶을 살아보세요. 저와 함께 긍정적인 사고와 자아 강화를 향한 여정을 시작해보세요',1,2,10),(7,'2023-08-28','2023-09-22',3,'자신을 사랑하고 믿는 힘',0,0,100000,7,'감정은 우리 삶의 핵심입니다. 이 상담은 감정의 다양한 면을 이해하고 표현하는 법을 배우는 과정입니다. 감정을 조절하고 긍정적인 방향으로 활용하여 더 강한 내면을 만들어 나갈 수 있도록 도와드립니다.',2,2,10),(8,'2023-08-17','2023-08-19',3,'인생의 목표와 방향성',0,1,100000,8,'자신을 사랑하고 믿는 것은 어떤 도전이라도 극복하는 기반이 됩니다. 이 상담은 자신의 가치를 인정하고 사랑하는 방법을 배우는 과정입니다. 과거의 자신과 화해하고 미래의 자신에게 희망을 가져보세요. 여기서 시작해보세요.',2,2,10),(9,'2023-08-28','2023-09-22',3,'건강 관리와 라이프스타일',0,0,80000,9,'성장은 목표를 향한 여정입니다. 이 상담은 당신이 원하는 목표를 설정하고 그것을 이루어나가는 과정을 함께 합니다. 함께 계획을 세우고 달성하는 동안, 더 나은 미래를 위한 길을 걷는데 필요한 지원을 제공합니다.',1,2,10),(10,'2023-08-28','2023-09-22',2,'새로운 시작을 위한 여정',0,0,100000,1,'삶의 여정에는 변화와 새로운 시작이 필요할 때가 있습니다. 이 상담은 새로운 시작을 위한 용기를 키우는 과정입니다. 과거의 짐을 내려놓고 앞으로 나아갈 수 있는 방향을 찾아보세요. 당신의 가능성을 믿습니다.',1,2,15),(11,'2023-08-18','2023-08-25',3,'여러분과 함께 힘냅시다.',0,0,30000,1,'이렇고 저렇게 힘든일이 있지만 다같이 중독 이겨냅시다.',2,4,8),(12,'2023-08-21','2023-09-20',2,'당신의 내면을 탐색하는 여정',0,0,80000,1,'string',1,0,10),(13,'2023-08-18','2023-08-18',6,'마지막 상담일 수 있습니다.',0,0,10000,1,'끊기 힘든 약물 끊도록 도와드릴게요',2,4,8),(14,'2023-08-18','2023-08-18',2,'마약에 지지 않는 나를 위해서',0,0,60000,1,'마약을 이겨내고 다시 한 번 새삶을 살아봅시다!',0,5,8);
/*!40000 ALTER TABLE `counsel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counsel_board`
--

DROP TABLE IF EXISTS `counsel_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counsel_board` (
  `counsel_board_id` int NOT NULL AUTO_INCREMENT,
  `counsel_board_title` varchar(255) NOT NULL,
  `counsel_board_content` text NOT NULL,
  `counsel_board_date` datetime NOT NULL,
  `counsel_board_state` int NOT NULL COMMENT '0- 등록, 1- 삭제',
  `counsel_board_type` int NOT NULL COMMENT '0- 공지사항',
  `user_id` int NOT NULL DEFAULT '0',
  `counsel_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`counsel_board_id`),
  KEY `FK_user_TO_counsel_board_1` (`user_id`),
  KEY `FK_counsel_TO_counsel_board_1` (`counsel_id`),
  CONSTRAINT `FK_counsel_TO_counsel_board_1` FOREIGN KEY (`counsel_id`) REFERENCES `counsel` (`counsel_id`),
  CONSTRAINT `FK_user_TO_counsel_board_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counsel_board`
--

LOCK TABLES `counsel_board` WRITE;
/*!40000 ALTER TABLE `counsel_board` DISABLE KEYS */;
/*!40000 ALTER TABLE `counsel_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counsel_img`
--

DROP TABLE IF EXISTS `counsel_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counsel_img` (
  `counsel_img_id` int NOT NULL AUTO_INCREMENT,
  `counsel_img_url` varchar(255) NOT NULL,
  `counsel_img_state` int NOT NULL COMMENT '0-등록, 1- 삭제',
  `counsel_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`counsel_img_id`),
  KEY `FK_counsel_TO_counsel_img_1` (`counsel_id`),
  CONSTRAINT `FK_counsel_TO_counsel_img_1` FOREIGN KEY (`counsel_id`) REFERENCES `counsel` (`counsel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counsel_img`
--

LOCK TABLES `counsel_img` WRITE;
/*!40000 ALTER TABLE `counsel_img` DISABLE KEYS */;
INSERT INTO `counsel_img` VALUES (1,'string',1,1),(2,'imgUrl',0,1),(3,'imgUrl2',0,1);
/*!40000 ALTER TABLE `counsel_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counsel_plan`
--

DROP TABLE IF EXISTS `counsel_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counsel_plan` (
  `counsel_plan_id` int NOT NULL AUTO_INCREMENT,
  `counsel_id` int NOT NULL DEFAULT '0',
  `counsel_start_time` datetime NOT NULL,
  `counsel_end_time` datetime NOT NULL,
  `day_id` int NOT NULL,
  PRIMARY KEY (`counsel_plan_id`),
  KEY `FK_counsel_TO_counsel_plan_1` (`counsel_id`),
  KEY `FK_day_TO_counsel_plan_1` (`day_id`),
  CONSTRAINT `FK_counsel_TO_counsel_plan_1` FOREIGN KEY (`counsel_id`) REFERENCES `counsel` (`counsel_id`),
  CONSTRAINT `FK_day_TO_counsel_plan_1` FOREIGN KEY (`day_id`) REFERENCES `day` (`day_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counsel_plan`
--

LOCK TABLES `counsel_plan` WRITE;
/*!40000 ALTER TABLE `counsel_plan` DISABLE KEYS */;
INSERT INTO `counsel_plan` VALUES (1,1,'2023-08-21 00:00:00','2023-08-21 00:00:00',1),(2,1,'2023-08-22 00:00:00','2023-08-22 00:00:00',2),(3,1,'2023-08-23 00:00:00','2023-08-23 00:00:00',3),(4,1,'2023-08-24 00:00:00','2023-08-24 00:00:00',4),(5,1,'2023-08-25 00:00:00','2023-08-25 00:00:00',5),(6,1,'2023-08-25 00:00:00','2023-08-26 00:00:00',1);
/*!40000 ALTER TABLE `counsel_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counselor`
--

DROP TABLE IF EXISTS `counselor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counselor` (
  `counselor_id` int NOT NULL AUTO_INCREMENT,
  `counselor_regist` varchar(255) DEFAULT NULL,
  `counselor_license` varchar(255) DEFAULT NULL,
  `counselor_school` varchar(30) DEFAULT NULL,
  `counselor_company` varchar(30) DEFAULT NULL,
  `counselor_ratesum` int DEFAULT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `counselor_state` int NOT NULL COMMENT '0-대기 1-인증완료 2- 인증 실패',
  `counselor_introduction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`counselor_id`),
  KEY `FK_user_TO_counselor_1` (`user_id`),
  CONSTRAINT `FK_user_TO_counselor_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counselor`
--

LOCK TABLES `counselor` WRITE;
/*!40000 ALTER TABLE `counselor` DISABLE KEYS */;
INSERT INTO `counselor` VALUES (1,NULL,NULL,'단국대학교','한국심리상담학회',5,1,1,'마음을 치유하는 상담사. 여러분의 내면을 함께 탐색하고 더 나은 삶을 위한 동반자가 되고 싶습니다. '),(2,'','','연세대학교','대한 신경정신과학회',5,22,1,'행동교정 전문 상담사. 여러분이 자신을 믿고 새로운 길을 찾아가는 과정을 함께 하고 싶습니다. '),(3,'','','중앙대학교','중앙대학교 의료원 신경정신과',4,23,1,'해결하기 어려운 문제들을 풀어나가며 아픔을 함께 극복합니다.'),(4,'','','성균관대학교','국무총리 산하, 청소년 위원회',5,24,1,'용서는 나를 위해 하는 것. 내 안에서 빠져나와 삶 속으로 걸어가세요. 당신의 Heartwarmer가 기다리고 있습니다.'),(5,'','','숙명여자대학교','한국인지과학연구소',4,25,1,'우리의 진정한 삶을 함께 찾아갑니다.'),(6,'','','충남대학교 ','서울예술심리상담센터',5,26,1,'이제 나를 마주하고 안아줄 시간입니다.'),(7,'','','덕성여자대학교','서대문구 청소년상담복지센터',5,27,1,'\'기질대로 살아야 행복하다\'고 합니다. 당신의 기질을 알아가는 여정에 동참하고 싶습니다.'),(8,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EA%B9%80%EB%AF%BC%EC%9E%AC.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EA%B9%80%EB%AF%BC%EC%9E%AC.jpg','단국대학교 ','심리상담연구소 앤아더라이프',5,28,1,'당신은 누가 뭐라해도 소중한 사람입니다. 나를 찾아가는 그 길, 함께하겠습니다.'),(9,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg','명지대학교 ','허그맘허그인 심리상담센터 ',5,29,1,'내면의 행복을 찾아가는 마음의 여정에 동행자가 되어 드리겠습니다.'),(10,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/drug1.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/drug1.jpg','건국대학교 ','성동광진교육지원청',5,31,1,'자유로운 마음, 유연한 마음으로 삶을 건강하게 살아갈 수 있도록 함께 하겠습니다.'),(11,'','','동국대학교 ','송파구건강가정지원센터',5,33,2,'당신의 마음에 진심으로 함께 하겠습니다.'),(12,'','','한세대학교','다담상담센터',5,34,2,'마음의 평안과 행복을 찾아가는 당신의 여정에 함께 하겠습니다.'),(13,'','','서울대학교',NULL,0,35,0,NULL),(14,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,39,0,NULL),(15,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,40,0,NULL),(16,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,41,0,NULL),(17,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,43,0,NULL),(18,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,44,0,NULL),(19,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,45,0,NULL),(20,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,46,0,NULL),(21,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,47,0,NULL),(22,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,48,0,NULL),(23,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,49,0,NULL),(24,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg','맨체스터 대학교',NULL,0,51,0,NULL),(25,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,52,0,NULL),(26,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png','맨체스터 대학교',NULL,0,53,0,NULL),(27,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%84%A5%EC%8A%A8%20%EC%9D%B4%EB%A0%A5%EC%84%9C.png','맨체스터 대학교',NULL,0,54,0,NULL),(28,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%84%A5%EC%8A%A8%20%EC%9D%B4%EB%A0%A5%EC%84%9C.png','맨체스터 대학교',NULL,0,55,0,NULL),(29,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%84%A5%EC%8A%A8%20%EC%9D%B4%EB%A0%A5%EC%84%9C.png','맨체스터 대학교',NULL,0,56,0,NULL),(30,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%84%A5%EC%8A%A8%20%EC%9D%B4%EB%A0%A5%EC%84%9C.png','맨체스터 대학교',NULL,0,57,0,NULL),(31,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg','테스트',NULL,0,58,0,NULL),(32,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/1.jpg','https://cartel-img.s3.ap-northeast-2.amazonaws.com/1.jpg','하버드',NULL,0,59,0,NULL),(33,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/logo.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/logo.png','서울대학교 ',NULL,0,60,0,NULL),(34,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/logo.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/logo.png','서울대학교 상담심리학과',NULL,0,61,1,NULL),(35,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/cat.png','https://cartel-img.s3.ap-northeast-2.amazonaws.com/cat.png','서울대 상담심리학과',NULL,0,62,0,NULL);
/*!40000 ALTER TABLE `counselor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum`
--

DROP TABLE IF EXISTS `curriculum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculum` (
  `curriculum_id` int NOT NULL AUTO_INCREMENT,
  `curriculum_title` int NOT NULL,
  `curriculum_content` text NOT NULL,
  `counsel_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`curriculum_id`),
  KEY `FK_counsel_TO_curriculum_1` (`counsel_id`),
  CONSTRAINT `FK_counsel_TO_curriculum_1` FOREIGN KEY (`counsel_id`) REFERENCES `counsel` (`counsel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum`
--

LOCK TABLES `curriculum` WRITE;
/*!40000 ALTER TABLE `curriculum` DISABLE KEYS */;
INSERT INTO `curriculum` VALUES (1,11,'1회차 - 약물중독에 의한 우울증과 정신건강의 역할 ',1),(2,1,'2회차 - 뇌와 신경계 그리고 마약이 미치는 영향',1),(3,1,'3회차 - 상담의 이해와 (집단, 개인상담) 사례실습',1),(4,1,'1회차 - 내 감정에 대한 이해와 인식 강화',2),(5,1,'2회차 - 지난 경험을 통한 자아 발견',2),(6,1,'3회차 - 자신과의 솔직한 대화 시작',2),(7,1,'1회차 - 부정적 감정과의 대처법 습득',3),(8,1,'2회차 - 긍정적 자아 대화 연습',3),(9,1,'3회차 - 자기 동기부여 기술 활용',3),(10,1,'1회차 - 자아 수용과 자기 존중감 강화',4),(11,1,'2회차 - 증가하는 자기 의식과 자신감',4),(12,1,'3회차 - 성장을 위한 목표 설정과 계획 수립',4),(13,1,'1회차 - 과거에서 배운 교훈 정리',5),(14,1,'2회차 - 자아 발전을 위한 긍정적 변화 도전',5),(15,1,'3회차 - 자신만의 성장 계획 수립',5),(16,1,'1회차 - 자아 발견을 위한 자기 탐색 시작',6),(17,1,'2회차 - 자신의 강점과 능력에 대한 인식 강화',6),(18,1,'3회차 - 자아 인정과 자신을 사랑하는 방법 학습',6),(19,1,'1회차 - 감정의 다양한 표현 방법 탐구',7),(20,1,'2회차 - 감정 변화에 대응하는 스트레스 관리 기술 습득',7),(21,1,'3회차 - 감정적인 균형 유지를 위한 마인드풀니스 연습',7),(22,1,'1회차 - 부정적인 자아 이미지와 이해관계 다루기',8),(23,1,'2회차 - 자아 긍정성 증진을 위한 자기 대화 기술',8),(24,1,'3회차 - 새로운 자아 신념과 자신에 대한 신뢰 구축',8),(25,1,'1회차 - 성공적인 목표 설정을 위한 스마트 기법 이해',9),(26,1,'2회차 - 자아 발전을 위한 자기 계발 전략 수립',9),(27,1,'3회차 - 자신의 성장을 지속시키기 위한 자기 관리 방법 익히기',9);
/*!40000 ALTER TABLE `curriculum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day`
--

DROP TABLE IF EXISTS `day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day` (
  `day_id` int NOT NULL AUTO_INCREMENT,
  `day` int DEFAULT NULL COMMENT '0-월, 1-화,2-수,3-목,4-금',
  PRIMARY KEY (`day_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day`
--

LOCK TABLES `day` WRITE;
/*!40000 ALTER TABLE `day` DISABLE KEYS */;
INSERT INTO `day` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation` (
  `evaluation_id` int NOT NULL AUTO_INCREMENT,
  `evaluation_rate` float NOT NULL DEFAULT '0',
  `evaluation_content` varchar(255) NOT NULL,
  `evaluation_date` datetime NOT NULL,
  `evaluation_state` int DEFAULT NULL COMMENT '0 - 등록, 1- 삭제',
  `counselor_id` int NOT NULL DEFAULT '0',
  `client_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`evaluation_id`),
  KEY `FK_counselor_TO_evaluation_1` (`counselor_id`),
  KEY `FK_client_TO_evaluation_1` (`client_id`),
  CONSTRAINT `FK_client_TO_evaluation_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `FK_counselor_TO_evaluation_1` FOREIGN KEY (`counselor_id`) REFERENCES `counselor` (`counselor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
INSERT INTO `evaluation` VALUES (1,4.5,'친절하고 따뜻한 상담으로 많은 도움 받았어요.','2023-08-15 10:41:41',0,1,1),(2,4.5,'정말로 내 마음을 이해해주셨고, 좋은 방향으로 나아가게 해주셨어요.','2023-08-15 10:38:32',0,1,5),(3,5,'매번 상담 후에 내면에서 변화가 일어나는 것 같아요.','2023-08-15 13:08:13',0,2,6),(4,5,'마음이 무거웠는데 상담 덕분에 가벼워졌어요.','2023-08-15 13:03:59',0,2,6),(6,5,'눈치 채지 못한 내 감정을 발견할 수 있게 해주셨어요.','2023-08-17 15:36:03',0,3,6),(7,4,'실용적인 조언으로 문제를 해결하는 방법을 알려주셨어요.','2023-08-17 16:52:26',0,4,1),(8,5,'함께한 시간이 마치 내 친구와 이야기하듯 편안했어요.','2023-08-17 21:04:05',0,5,1),(9,5,'상담을 통해 내 자신에 대해 더 알게 되었어요.','2023-08-17 21:04:09',0,6,1),(10,5,'끝까지 듣고 이해해주셔서 감사했어요.','2023-08-18 05:23:38',0,7,1),(11,4,'불안한 마음을 진정시켜주셔서 고마웠어요.','2023-08-18 05:23:41',0,8,1);
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multiple_choice_answer`
--

DROP TABLE IF EXISTS `multiple_choice_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multiple_choice_answer` (
  `multiple_choice_id` int NOT NULL AUTO_INCREMENT,
  `review_question_id` int NOT NULL,
  `choice_id` int NOT NULL,
  PRIMARY KEY (`multiple_choice_id`),
  KEY `FK_review_question_TO_multiple_choice_answer_1` (`review_question_id`),
  KEY `FK_multiple_choice_type_TO_multiple_choice_answer_1` (`choice_id`),
  CONSTRAINT `FK_multiple_choice_type_TO_multiple_choice_answer_1` FOREIGN KEY (`choice_id`) REFERENCES `multiple_choice_type` (`choice_id`),
  CONSTRAINT `FK_review_question_TO_multiple_choice_answer_1` FOREIGN KEY (`review_question_id`) REFERENCES `review_question` (`review_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multiple_choice_answer`
--

LOCK TABLES `multiple_choice_answer` WRITE;
/*!40000 ALTER TABLE `multiple_choice_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `multiple_choice_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multiple_choice_type`
--

DROP TABLE IF EXISTS `multiple_choice_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multiple_choice_type` (
  `choice_id` int NOT NULL AUTO_INCREMENT,
  `choice_content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`choice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multiple_choice_type`
--

LOCK TABLES `multiple_choice_type` WRITE;
/*!40000 ALTER TABLE `multiple_choice_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `multiple_choice_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `notification_message` varchar(255) NOT NULL,
  `notification_send_type` int NOT NULL COMMENT '0- 강의 폐강, 1- 강의공지',
  `notification_time` date NOT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_state_id` int NOT NULL AUTO_INCREMENT,
  `payment_status` int NOT NULL COMMENT '0 - 결제 완료, 1 - 결제 환불',
  `payment_amount` int NOT NULL,
  `payment_time` datetime NOT NULL,
  `client_id` int NOT NULL DEFAULT '0',
  `payment_id` varchar(100) DEFAULT NULL,
  `payment_method` varchar(100) NOT NULL,
  PRIMARY KEY (`payment_state_id`),
  KEY `FK_client_TO_payment_1` (`client_id`),
  CONSTRAINT `FK_client_TO_payment_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,0,1100,'2023-08-16 11:07:37',1,NULL,'카카오 페이'),(2,0,11100,'2023-08-16 17:04:57',1,NULL,'카카오 페이'),(5,0,11100,'2023-08-16 17:21:33',10,NULL,'카카오 페이'),(6,0,11100,'2023-08-16 22:25:22',11,NULL,'카카오 페이'),(7,0,1200,'2023-08-17 13:47:19',12,NULL,'카카오 페이'),(8,0,1110,'2023-08-17 14:08:50',14,NULL,'카카오 페이'),(9,0,1200,'2023-08-17 14:09:25',15,NULL,'카카오 페이'),(10,0,1200,'2023-08-17 14:10:17',16,NULL,'카카오 페이'),(11,0,0,'2023-08-17 15:00:11',17,NULL,'카카오 페이'),(12,0,0,'2023-08-17 16:58:46',18,NULL,'카카오 페이'),(13,0,0,'2023-08-17 20:11:05',19,NULL,'카카오 페이'),(14,0,0,'2023-08-18 01:29:36',20,NULL,'카카오 페이'),(15,0,30000,'2023-08-18 01:31:10',21,NULL,'카카오 페이'),(16,0,0,'2023-08-18 01:31:56',22,NULL,'카카오 페이'),(17,0,0,'2023-08-18 01:33:48',23,NULL,'카카오 페이'),(18,0,0,'2023-08-18 01:35:56',24,NULL,'카카오 페이'),(19,0,0,'2023-08-18 02:04:09',26,NULL,'카카오 페이'),(20,0,0,'2023-08-18 02:04:25',27,NULL,'카카오 페이'),(21,0,0,'2023-08-18 02:53:21',28,NULL,'카카오 페이'),(22,0,0,'2023-08-18 02:55:35',29,NULL,'카카오 페이'),(23,0,0,'2023-08-18 08:47:01',30,NULL,'카카오 페이'),(24,0,0,'2023-08-18 09:08:24',31,NULL,'카카오 페이'),(25,0,0,'2023-08-18 09:09:15',32,NULL,'카카오 페이');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL DEFAULT '0',
  `curriculum_id` int NOT NULL DEFAULT '0',
  `review_state` int NOT NULL COMMENT '0 - 등록, 1 - 삭제',
  `review_date` datetime NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FK_client_TO_review_1` (`client_id`),
  KEY `FK_curriculum_TO_review_1` (`curriculum_id`),
  CONSTRAINT `FK_client_TO_review_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `FK_curriculum_TO_review_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculum` (`curriculum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_answer`
--

DROP TABLE IF EXISTS `review_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_answer` (
  `review_answer_id` int NOT NULL AUTO_INCREMENT,
  `review_answer` text,
  `review_date` datetime NOT NULL,
  `review_question_id` int NOT NULL,
  PRIMARY KEY (`review_answer_id`),
  KEY `FK_review_question_TO_review_answer_1` (`review_question_id`),
  CONSTRAINT `FK_review_question_TO_review_answer_1` FOREIGN KEY (`review_question_id`) REFERENCES `review_question` (`review_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_answer`
--

LOCK TABLES `review_answer` WRITE;
/*!40000 ALTER TABLE `review_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_question`
--

DROP TABLE IF EXISTS `review_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_question` (
  `review_question_id` int NOT NULL AUTO_INCREMENT,
  `review_question` text NOT NULL,
  `review_id` int NOT NULL,
  `review_question_type` int NOT NULL COMMENT '0 - 주관식, 1 - 객관식',
  PRIMARY KEY (`review_question_id`),
  KEY `FK_review_TO_review_question_1` (`review_id`),
  CONSTRAINT `FK_review_TO_review_question_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_question`
--

LOCK TABLES `review_question` WRITE;
/*!40000 ALTER TABLE `review_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_nickname` varchar(50) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_phone` varchar(50) DEFAULT NULL,
  `user_point` int DEFAULT '0',
  `user_profile_url` varchar(255) DEFAULT NULL,
  `user_state` int NOT NULL DEFAULT '0' COMMENT '0- 이용자, 1- 탈퇴',
  `user_type` int NOT NULL DEFAULT '0' COMMENT '0-일반회원(user) ,1--내담자(client), 2-상담사(Counselor), 3- 관리자(admin)',
  `user_refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'q@q','123','불개미','류형찬','123',55,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,2,NULL),(2,'cartel@1234','$2a$10$.WR1ysfM5rxJF/VDBdIP2ug.2Ndlftr9K2ctZebmFHIFCm3NiRTIC','tetst',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpOWIyMDkucC5zc2FmeS5pbyIsImlhdCI6MTY5MTU1MjI3MiwiZXhwIjoxNjkxNTY2NjcyLCJzdWIiOiJjYXJ0ZWxAMTIzNCIsInR5cGUiOiJ1c2VyIiwiaWQiOjJ9.BSU8VXk6VuqonWqXeo3miVyd_ke1YiJsVwahxvPke-M'),(3,'test@1234','$2a$10$2CrDSOMUIcrX/AhNszwakufe962hCpvYegsDKXGsLjdBIvrJCj0ty','롤로노아김동우','박씨','56789',0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpOWIyMDkucC5zc2FmeS5pbyIsImlhdCI6MTY5MTU2MjY4MSwiZXhwIjoxNjkxNTYyNjgxLCJzdWIiOiJ0ZXN0QDEyMzQiLCJ0eXBlIjoidXNlciIsImlkIjozfQ._OI5aiJLVXp2w2G96OuEAlQunQn_3YNyGcd7cbAievY'),(6,'carte1l@1234','$2a$10$QK0aQf4Ox385bCHrzJwFR.unKJgVU9vhozHoXK1ze4jM/td.MKp4a','수정',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYXJ0ZTFsQDEyMzQiLCJleHAiOjE2OTIzMjU2MTgsImlhdCI6MTY5MTcyMDgxOH0.wKgcMPw-9OYSk4Wsl8JxukkyUlNfSiWuH73pfAlc43k'),(7,'asdf@1234','$2a$10$NdDPwlwn3oydWpAJELCEy.CHiQ2TAzjf9KYmvaW2VciaGJKTc.cSC','박싸피',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQDEyMzQiLCJleHAiOjE2OTIzMjU1NzcsImlhdCI6MTY5MTcyMDc3N30.-sV5sLhkAK-NdzXLQDPuq4uQQHLZx3zhEOohiksZZGE'),(8,'alsk@1234','$2a$10$zt3jWtVMae4OCUDbNrPAd.UPCUSZeVL6JLmlmSuWKkqC5GG.Vbpvm','이싸피',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbHNrQDEyMzQiLCJleHAiOjE2OTI4OTQ3NzAsImlhdCI6MTY5MjI4OTk3MH0.Ym_WPCFN0skpDhZPzeMJDPgtZnZzUGdsEmj8VKEObBQ'),(9,'asd@asd.asd','$2a$10$LhjwJvzcvOdTwpIbW1xaOu/134zU.IDIAiOdnCxc6Z/48gLDPepkK','되나',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(11,'cartel@cartel.com','$2a$10$OM3bAb8Yrc3BOjaN4PLC8ebnqwG1rnXwoAwhNfi6hhYcQSwydYQp.','관리자',NULL,NULL,60,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,3,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYXJ0ZWxAY2FydGVsLmNvbSIsImV4cCI6MTY5MjMzMjE5NiwiaWF0IjoxNjkxNzI3Mzk2fQ.iFfGDPSiA_qhaIZKh4Nc0BERx-028mah6YMJJ0NfFKI'),(12,'qwa406@naver.com','$2a$10$SfqEcIn8k/UAN2joOuY6feIYsTvJ0AveOuLijfRomPCurwno8pSkG','확인요',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2E0MDZAbmF2ZXIuY29tIiwiZXhwIjoxNjkyMzM3Njc0LCJpYXQiOjE2OTE3MzI4NzR9.dFR0B2PYKIuF6S2f9kS_Q9__4KDSjjfLJgATaAQ7rQ4'),(13,'tjralsgur12@naver.com','$2a$10$ukJc/RrI0csVrHegY2v2JetI3JATWpojxaSefCR55GwbUDKKenz6y','족구왕','석민혁','12341234',20,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0anJhbHNndXIxMkBuYXZlci5jb20iLCJleHAiOjE2OTIzMzg2MjEsImlhdCI6MTY5MTczMzgyMX0.D54Y5lnuCzKBG8Bp4h33xYneMBSwQYW5IoTUMu8IdXM'),(14,'jkl@1234','$2a$10$xWhg.Z6Vx4gjvUQNudVCleOnHiyMwOB/JMVCfzajytPvoh9KxdjRq','싸피',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(15,'jkll@1234','$2a$10$T/Te.5eeUsAhMwPMJlp9LezMYPoYO1H9y.GfrHc/fjmZXmdCxSHlK','싸피',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(16,'adh1120@naver.com','$2a$10$s.q/fqX0qRN8FIAySCd6bOuMEmHRp9zUtwN6Lb50Bo4tHAZ2CVN7m','싸피',NULL,NULL,20,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGgxMTIwQG5hdmVyLmNvbSIsImV4cCI6MTY5MjUwNzk4NCwiaWF0IjoxNjkxOTAzMTg0fQ.Q9WqYo6_69cekM2JbbOr6Njmpoa3ZnUvc7GUcqtP_98'),(17,'csg1353@naver.com','$2a$10$aVr51fjM0EvrpAn0VBX7Su8XR5DXQHdfWqiec7OiQXVxu4KmXbNXW','asd',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjc2cxMzUzQG5hdmVyLmNvbSIsImV4cCI6MTY5MjUzNTMwOCwiaWF0IjoxNjkxOTMwNTA4fQ.TitRxHqNKpsxA6aUtBViHqld7_a4FUKmW4EBbQXIpCQ'),(18,'bluest12@naver.com','$2a$10$JwhudmQvmY1KxIFfkTMPcOs5Il.NRXyEz2RhEKkq/ZxVw3Sy5aAke','kia',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJibHVlc3QxMkBuYXZlci5jb20iLCJleHAiOjE2OTI1NDI3NDMsImlhdCI6MTY5MTkzNzk0M30.AS8qeZpSBUmDhbNoOuuH4lln0xpkb5rGRR9DA0ZIxds'),(19,'xogmamo2c@naver.com','$2a$10$k4ULMcmTBXnE9dHQFU0t6uKM/UYMVhk5wrGJzzyCvKJNlBHl527a6','최고상담사',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,2,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4b2dtYW1vY0BuYXZlci5jb20iLCJleHAiOjE2OTI1NzgyMTIsImlhdCI6MTY5MTk3MzQxMn0.-SrP9Ixnq_RnAOZGfUHgoY1Wi5DQy2gMjf23f23ZoSo'),(20,'uidfop@1234','$2a$10$pbs0oMkVBEORvP7RPjbWsedau1eBn2ivO50vay9U2uxX0wSl9zxJO','싸피',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(21,'qwer@naver.com','$2a$10$X.2EXHy9.uTRXk2kLpM29.MYImKL7yW7crLHMJIWLvfKGMpsC8E66','asdf',NULL,NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(22,'qwer@naver.com','$2a$10$D8wYQlP0bsIWVqNm.EnKFOs4EwdKgulU6syX2.irz1eeIum7oN7nq','asdf','오은형',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(23,'s@naver.com','$2a$10$tcisSGgDzCbJA9.fGJGq7uPRLRT6icKSpmbIsyGeIQ.rrVgerVVL2','ger','오지희',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzQG5hdmVyLmNvbSIsImV4cCI6MTY5Mjg0MjA4OSwiaWF0IjoxNjkyMjM3Mjg5fQ.8tqPwpF8DV7FbAeaz4VSkd6s_JVOYK0kg0vHzcPSNQU'),(24,'sss@naver.com','$2a$10$si2RwFemXtj88ujp29qiVeRCS22dVgrogXivI3Gc994Eo.u1yivXK','gw','박윤정',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(25,'sss1@naver.com','$2a$10$j2qiLThBD7HL/mTTKHcK4ubx4cPFTZfgJgzhUaC8tSn8My8SqSweO','wgd','박현숙',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(26,'ssss1@naver.com','$2a$10$kFTewKuBlbsOejPFVW93Pek9ndjeJXzZE/.agHSP8qBlE/D/AONoK','rvwv','이원재',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(27,'as1@naver.com','$2a$10$SkMLM81UU1yDRQzr4IlS6ODSRJ1JZG1haEQmOcAG76Sh3jSJnmUqm','etg','박규나',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(28,'as12@naver.com','$2a$10$mvN7M.X8ZxnrBPBnDH/Wb.LjQ1sF7H1n/SOCFTn32d4PRnUlQh79W','dvfv','박혜진',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EA%B9%80%EB%AF%BC%EC%9E%AC.jpg',0,0,NULL),(29,'parkchason123@naver.com','$2a$10$f6hgA6Yu1aBY56WIElHVlehI.DnaVP/sULqQU1boZ0XFhGXHoo2v2','전문가2','김지영',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,NULL),(30,'a79171512@gmail.com','$2a$10$1IGcefigWMEmFtBT8RGeruHmF/vEKAYoS.L/SziDl6KNBXz.dgGiu','김차박','유지혜',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EB%B0%95%EC%A7%80%EC%84%B1.jpg',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNzkxNzE1MTJAZ21haWwuY29tIiwiZXhwIjoxNjkyODM5MzUwLCJpYXQiOjE2OTIyMzQ1NTB9.DkfaO1GaxMX22lNVIkNbZPJUBbIsOA5SJ3NfYvfab_Y'),(31,'parkchason123@naver.com','$2a$10$mK0UzSe0T2v7uavx.3ShUeH40Vbpb/pa.B4s3BWpjQHKmqZ96jxWq','전문가2','안윤정',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/drug1.jpg',0,0,NULL),(32,'9gi.test@gmail.com','$2a$10$Frap/PC9fhVGur.t4o8SrOHkZMbOAYCjTN/DHPSDzMUu9el2VJWFa','yak','김소현',NULL,20,NULL,0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5Z2kudGVzdEBnbWFpbC5jb20iLCJleHAiOjE2OTI3NzMwMTIsImlhdCI6MTY5MjE2ODIxMn0.U_hGAiKHvs2HzQ_Bw3AOJ7D24WOrq-EH8qTLAzNrDXE'),(33,'as1@naver.com','$2a$10$fvTpRPMsmor94f317LTaFeXRcIgmxj7R1jBFaZcs9MuT35oxPSomO',NULL,'상담사1',NULL,0,NULL,0,0,NULL),(34,'as111@naver.com','$2a$10$suZf68jh0mzMrsiltqOG3ezbRpvrGAaNp9YAIrfjjZhQ50MtxjIx6',NULL,'상담사1',NULL,0,NULL,0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhczExMUBuYXZlci5jb20iLCJleHAiOjE2OTI4NDIzNDIsImlhdCI6MTY5MjIzNzU0Mn0.EWwYFK6j37ZtPnrg3ahAiPkReTSCCi4lIZoQY6sCrE8'),(35,'as222@naver.com','$2a$10$UIrj6WFyYlTpU5ltsX0n9.dKZqjZMe63pNtCdiu.tmCyIU9mfdcgK',NULL,'상담사1',NULL,0,NULL,0,2,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhczIyMkBuYXZlci5jb20iLCJleHAiOjE2OTI4NDk5NzksImlhdCI6MTY5MjI0NTE3OX0.4lcxuZ7R1Zv9-jINrkKAf7DePs5uhNw_n96p0bPCwOA'),(36,'zxa406@naver.com','$2a$10$EK/mGu0zuuNp2u5.irrCBe24JtlOTu.JScasE157qSH7cbxdtADbi','일반회원',NULL,NULL,0,NULL,0,0,NULL),(37,'tyu@1234','$2a$10$LoT8nPuq5rixaCyz4NVjHOVK3B.g7W021odbnr4V9JTDGq5nXIrYy','권싸피',NULL,NULL,0,NULL,0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0eXVAMTIzNCIsImV4cCI6MTY5Mjg0OTkxNywiaWF0IjoxNjkyMjQ1MTE3fQ.ZomQ_LNcPpDSwupUzczBI1H5hLlU3yL3awqKuag9Hyo'),(38,'pikachu110485@gmail.com','$2a$10$c.PQkXy1YFW3tQzR6nrh0uFKwL/LzzGtDgdTEywJrTVmHJ/Ymj6Oi','test',NULL,NULL,0,NULL,0,0,NULL),(39,'test154854@naver.com','$2a$10$xSwkEA/Y8rDzEhrtA/p3z.SytpiKWDAIV8sPRC/QdWDxZuVwz4T9y','전문가2','상담사2',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(40,'test1548544@naver.com','$2a$10$jrugZzmHFvGqiNOIh3HKFONiPaG/8hwJGosEGiS9804eaZyjEKEzK','','상담사2',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(41,'test15485444@naver.com','$2a$10$TzcDBdhxzaGNneg.m8cT1eS9y1l1dfoWkKLhxV33rCnb.S3EGykOW','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(42,'seok971104@gmail.com','$2a$10$wR1/74zAsMx5D5aPc5Dem.NouFtHToOkscjr11L.g4JSXJ1AcSCEm','석민혁',NULL,NULL,0,NULL,0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW9rOTcxMTA0QGdtYWlsLmNvbSIsImV4cCI6MTY5Mjg1NDY2NiwiaWF0IjoxNjkyMjQ5ODY2fQ.S919uCdfYPVHXyn37fO6WvoAolnBujSdAXxxpsc1X8c'),(43,'test15485444@naver.com','$2a$10$KWGwl6I.W8/Mcn8Aq6vQEeYez/EBqxEcJqTnNBxlzXewU1t4bPJI.','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(44,'test15485444@naver.com','$2a$10$Awau7sUBmypNVTs76yte1eBpWWX6PHdK6i.Pb8Oxeueh0rJtIjs2.','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(45,'test15485444@naver.com','$2a$10$V1zRxKHLwPqw0/5rBw/vVuL2bnGeA1qUhCrPqgNwujHClSJq184mO','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(46,'test15485444@naver.com','$2a$10$DxlWksEEXZwEdCDjTrWODuM5ldptAhm9iRUYvgnoIdAPARG63yYVm','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(47,'test15485444@naver.com','$2a$10$ddRVsNQTNQS8C3lMqwFhN.uS2F3W8hOjG3wWklmXRHphK5awLCFye','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(48,'test15485444@naver.com','$2a$10$6bGCX7zilZt36KwXlAAzIOcL2h1G8.cSE0RQWtGhu5VrpRNkSSQnm','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(49,'test15485444@naver.com','$2a$10$GmZSpg5X1CQeEq5SBAaiGOexWgHX2N7DLzomhXnvDgD/XwntqeMeu','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(50,'jbs6606@naver.com','$2a$10$QBtR/QjO2vqiP9VsRTiSNOdOjpg.pfdNXx8MadKFMzgNPCGPP/JZq','밍세',NULL,NULL,0,NULL,0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYnM2NjA2QG5hdmVyLmNvbSIsImV4cCI6MTY5Mjg1OTE1OSwiaWF0IjoxNjkyMjU0MzU5fQ.-G9El_912RZd6rsU8RBF0nUs9qJPvf81LzmKWCDptt0'),(51,'test15485444@naver.com','$2a$10$cl/7zmskVWLIiqmDFXj0X./ektW31SzcyJY4lreHLYj5lRQiLfvS6','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg',0,2,NULL),(52,'test15485444@naver.com','$2a$10$KspPF05NX9lE7sn.81uv9.Ytc4lo3A1BsozPgDQo2MN.nccma0IAm','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(53,'test15485444@naver.com','$2a$10$bNU.Mp0MFTVBA09m8DKGoOlaAxNSNaczfxjWX0BYv1Qbd4KszcuV2','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(54,'test15485444@naver.com','$2a$10$jSqgMjQPahbxi6qi6lAQMOQP10zmRiN1lgHhNHd0Ld0eUDJ4ekMku','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(55,'test15485444@naver.com','$2a$10$HnEMtNeIXDVaULI9upN4LuK3fLiF.onr/cb9loLnJUmI3Y7jCH1DO','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(56,'test15485444@naver.com','$2a$10$4DvNBEUaQnXMQ6i1fP3fJ.hQD6Q611Q8Famsr3e8JtUIhBuaNooxm','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(57,'test15485444@naver.com','$2a$10$2kUbyXM4JYc3gLPS78IbmuNgGPRtFv01k8.P1QgMU.39wUVzqBY.2','','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%20%EB%8B%98%20%EB%A9%B4%EC%A0%91%20%EC%B0%B8%EA%B0%80%20%ED%99%95%EC%9D%B8%EC%84%9C-1.png',0,2,NULL),(58,'pikachu11045@gmail.com','$2a$10$yf2QITuIe24RofKAurO.f.hnMXTz10984M6HOscRBKIJHB3UVsycO','nickname','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/%EC%84%9D%EB%AF%BC%ED%98%81%EB%8B%98_%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A7%84%ED%96%89%ED%99%95%EC%9D%B8%EC%84%9C_page-0001.jpg',0,2,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaWthY2h1MTEwNDVAZ21haWwuY29tIiwiZXhwIjoxNjkyODY1Mjk3LCJpYXQiOjE2OTIyNjA0OTd9.T1SpyCVlEWU-4BS_oPszAiitpTf9Otap69-PPQEQPCw'),(59,'poiu542@hanmail.net','$2a$10$sqASKMEER/1qGLCXMBzK0uUriA7BOCsDzMY4kbAUZAh83AVex28/K','nickname','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/1.jpg',0,2,NULL),(60,'adh3576@gmail.com','$2a$10$xz99.JSUIurHQeXhOdPOqObkxOybbickfrjrvs8yXLFrUvFXsLrVW','김싸피','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/logo.png',0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGgzNTc2QGdtYWlsLmNvbSIsImV4cCI6MTY5Mjg3ODExNCwiaWF0IjoxNjkyMjczMzE0fQ.jQ3GZT8SYC3_zvHn6ynwdh4SkhLDslbl9BYCV4cTy4M'),(61,'w@w','$2a$10$kOkK6qoMAmT8aLvccKiameYF4XVx3Gatf6ACiz3/z3n1Cf17erZOi','친절상담사','친절상담사',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/logo.png',0,2,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4b2dtYWRvbUBuYXZlci5jb20iLCJleHAiOjE2OTI4NzkzMzMsImlhdCI6MTY5MjI3NDUzM30.oIViLUf2Qsh5oPwtG-qufH2TLg-U_K4C3IGpmkQ0o24'),(62,'xogmadom@naver.com','$2a$10$K9cHP.fwzGOpmpTc2DiZg.NnxDAycLPONrxYLyJBKgZ6WLLslVDrq','nickname','',NULL,0,'https://cartel-img.s3.ap-northeast-2.amazonaws.com/cat.png',0,2,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4b2dtYWRvbUBuYXZlci5jb20iLCJleHAiOjE2OTI4OTA4MDIsImlhdCI6MTY5MjI4NjAwMn0.wTVBknTcChPAS6zwElAbVTo0CPIcoUnqSBzJkR1f7kk'),(63,'a@a','$2a$10$Ch.aX0eZabZAhpQCNIgR5eGGveXCquz4jcsC9hpU6JlvXzMy4gd0e','밀싸피',NULL,NULL,0,NULL,0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJleHAiOjE2OTI4OTY1NjUsImlhdCI6MTY5MjI5MTc2NX0.ZOYTSWOzNT1_h8IRA687O6R5JlFH2wGXeoa96Dxf3Gc'),(64,'s@s','$2a$10$sDWQPpT5iiFYpUjcJy5wXOU/KIEgfKX5b6axWUB6Hcvwl7znNyOba','미싸피',NULL,NULL,0,NULL,0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzQHMiLCJleHAiOjE2OTI4OTY1NzAsImlhdCI6MTY5MjI5MTc3MH0.AkCdZnJw4I08h_6lifqw18lr7fJRpAS92vpUaDGw-TM');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notification`
--

DROP TABLE IF EXISTS `user_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_notification` (
  `user_notification_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL DEFAULT '0',
  `notification_id` int NOT NULL,
  PRIMARY KEY (`user_notification_id`),
  KEY `FK_client_TO_user_notification_1` (`client_id`),
  KEY `FK_notification_TO_user_notification_1` (`notification_id`),
  CONSTRAINT `FK_client_TO_user_notification_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `FK_notification_TO_user_notification_1` FOREIGN KEY (`notification_id`) REFERENCES `notification` (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notification`
--

LOCK TABLES `user_notification` WRITE;
/*!40000 ALTER TABLE `user_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_notification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:09:25
