/* =====================================================================
   DỮ LIỆU HỌC — chỉnh sửa / bổ sung trực tiếp trong các mảng dưới đây
   ===================================================================== */

/* 1. GỐC HÁN (한자어): h = chữ Hán, k = âm Hán Hàn, v = âm Hán Việt, m = nghĩa
      w = [từ Hàn, âm Hán Việt, nghĩa tiếng Việt] */
const HANJA = [
 {h:"法",k:"법",v:"pháp",m:"luật, phép tắc, phương pháp",w:[
  ["법률","pháp luật","pháp luật"],["헌법","hiến pháp","hiến pháp"],["위법","vi pháp","vi phạm pháp luật"],["합법","hợp pháp","hợp pháp"],
  ["입법","lập pháp","lập pháp"],["법원","pháp viện","tòa án"],["방법","phương pháp","phương pháp, cách"],["문법","văn pháp","ngữ pháp"]]},
 {h:"政",k:"정",v:"chính",m:"việc cai trị, chính sự",w:[
  ["정치","chính trị","chính trị"],["정부","chính phủ","chính phủ"],["정책","chính sách","chính sách"],["행정","hành chính","hành chính"],
  ["재정","tài chính","tài chính (công)"],["정당","chính đảng","đảng phái chính trị"]]},
 {h:"民",k:"민",v:"dân",m:"dân, người dân",w:[
  ["국민","quốc dân","nhân dân, công dân một nước"],["민주","dân chủ","dân chủ"],["시민","thị dân","công dân, người dân thành phố"],["민족","dân tộc","dân tộc"],
  ["민법","dân pháp","luật dân sự"],["이민","di dân","di cư, di dân"],["주민","trú dân","cư dân"],["농민","nông dân","nông dân"]]},
 {h:"會",k:"회",v:"hội",m:"họp, gặp gỡ, tổ chức",w:[
  ["사회","xã hội","xã hội"],["회의","hội nghị","cuộc họp"],["국회","quốc hội","quốc hội"],["기회","cơ hội","cơ hội"],
  ["협회","hiệp hội","hiệp hội"],["회원","hội viên","hội viên, thành viên"],["대회","đại hội","đại hội, cuộc thi"],["회사","hội xã","công ty"]]},
 {h:"經",k:"경",v:"kinh",m:"trải qua, quản lý, kinh điển",w:[
  ["경제","kinh tế","kinh tế"],["경험","kinh nghiệm","kinh nghiệm, trải nghiệm"],["경영","kinh doanh","quản trị, kinh doanh"],["신경","thần kinh","thần kinh"],
  ["경전","kinh điển","kinh sách"],["경력","kinh lịch","kinh nghiệm làm việc, lý lịch nghề nghiệp"]]},
 {h:"學",k:"학",v:"học",m:"học, môn học",w:[
  ["학생","học sinh","học sinh, sinh viên"],["과학","khoa học","khoa học"],["문학","văn học","văn học"],["학문","học vấn","học thuật, ngành học"],
  ["유학","du học","du học"],["학자","học giả","học giả"],["철학","triết học","triết học"],["학원","học viện","trung tâm học thêm tư nhân"]]},
 {h:"生",k:"생",v:"sinh",m:"sống, sinh ra",w:[
  ["생활","sinh hoạt","cuộc sống, sinh hoạt"],["생산","sinh sản","sản xuất"],["생명","sinh mệnh","sinh mạng, sự sống"],["발생","phát sinh","phát sinh, xảy ra"],
  ["위생","vệ sinh","vệ sinh"],["생일","sinh nhật","sinh nhật"],["출생","xuất sinh","sự ra đời"],["고생","khổ sinh","vất vả, cực nhọc"]]},
 {h:"發",k:"발",v:"phát",m:"phát ra, bắt đầu",w:[
  ["발전","phát triển","phát triển"],["발표","phát biểu","công bố, thuyết trình"],["개발","khai phát","phát triển, khai thác"],["발견","phát kiến","phát hiện"],
  ["발명","phát minh","phát minh"],["출발","xuất phát","xuất phát"],["폭발","bộc phát","vụ nổ, bùng nổ"]]},
 {h:"化",k:"화",v:"hóa",m:"biến đổi, trở thành",w:[
  ["문화","văn hóa","văn hóa"],["변화","biến hóa","sự thay đổi"],["강화","cường hóa","tăng cường"],["산업화","sản nghiệp hóa","công nghiệp hóa"],
  ["세계화","thế giới hóa","toàn cầu hóa"],["고령화","cao linh hóa","già hóa dân số"],["정보화","tình báo hóa","tin học hóa, số hóa thông tin"],["민주화","dân chủ hóa","dân chủ hóa"]]},
 {h:"情",k:"정",v:"tình",m:"tình cảm, tình hình",w:[
  ["정보","tình báo","thông tin"],["감정","cảm tình","cảm xúc"],["애정","ái tình","tình yêu thương"],["사정","sự tình","hoàn cảnh, lý do"],
  ["정세","tình thế","tình hình (chính trị)"],["동정","đồng tình","sự thương cảm"],["열정","nhiệt tình","đam mê, nhiệt huyết"]]},
 {h:"公",k:"공",v:"công",m:"chung, công cộng, công bằng",w:[
  ["공공","công cộng","công cộng"],["공무원","công vụ viên","công chức"],["공개","công khai","công khai"],["공평","công bình","công bằng"],
  ["공정","công chính","công bằng, chính trực"],["공식","công thức","chính thức; công thức"],["공원","công viên","công viên"]]},
 {h:"安",k:"안",v:"an",m:"yên ổn",w:[
  ["안전","an toàn","an toàn"],["안정","an định","ổn định"],["불안","bất an","bất an, lo lắng"],["치안","trị an","trật tự trị an"],
  ["안심","an tâm","yên tâm"],["보안","bảo an","an ninh, bảo mật"],["평안","bình an","bình an"]]},
 {h:"問",k:"문",v:"vấn",m:"hỏi",w:[
  ["문제","vấn đề","vấn đề, câu hỏi (bài thi)"],["질문","chất vấn","câu hỏi, đặt câu hỏi"],["방문","phỏng vấn","thăm viếng"],["고문","cố vấn","cố vấn"],
  ["문답","vấn đáp","hỏi đáp"],["의문","nghi vấn","nghi vấn, thắc mắc"]]},
 {h:"意",k:"의",v:"ý",m:"ý, ý nghĩ",w:[
  ["의견","ý kiến","ý kiến"],["의미","ý vị","ý nghĩa"],["주의","chú ý","chú ý, cẩn thận"],["의지","ý chí","ý chí"],
  ["동의","đồng ý","đồng ý"],["의식","ý thức","ý thức"],["합의","hợp ý","thỏa thuận, đồng thuận"]]},
 {h:"動",k:"동",v:"động",m:"chuyển động",w:[
  ["운동","vận động","thể thao; phong trào"],["활동","hoạt động","hoạt động"],["행동","hành động","hành động"],["노동","lao động","lao động"],
  ["자동","tự động","tự động"],["감동","cảm động","cảm động"],["이동","di động","di chuyển"],["동기","động cơ","động cơ, động lực"]]},
 {h:"國",k:"국",v:"quốc",m:"nước, quốc gia",w:[
  ["국가","quốc gia","quốc gia"],["국제","quốc tế","quốc tế"],["외국","ngoại quốc","nước ngoài"],["국적","quốc tịch","quốc tịch"],
  ["애국","ái quốc","yêu nước"],["국경","quốc cảnh","biên giới"]]},
 {h:"力",k:"력",v:"lực",m:"sức, năng lực",w:[
  ["노력","nỗ lực","nỗ lực"],["능력","năng lực","năng lực"],["권력","quyền lực","quyền lực"],["압력","áp lực","áp lực"],
  ["실력","thực lực","thực lực"],["협력","hiệp lực","hợp tác"],["폭력","bạo lực","bạo lực"],["영향력","ảnh hưởng lực","sức ảnh hưởng"]]},
 {h:"判",k:"판",v:"phán",m:"xét, phân định",w:[
  ["판단","phán đoán","phán đoán, đánh giá"],["재판","tài phán","xét xử"],["판사","phán sự","thẩm phán"],["비판","phê phán","phê phán"],
  ["판결","phán quyết","bản án, phán quyết"],["심판","thẩm phán","trọng tài; sự phán xét"]]}
];

/* Từ "giống mặt chữ nhưng khác nghĩa": [từ Hàn, chữ Hán, âm Hán Việt, nghĩa trong tiếng Hàn, nghĩa Hán Việt trong tiếng Việt / ghi chú] */
const FALSE_FRIENDS = [
 ["환경","環境","hoàn cảnh","môi trường","Tiếng Việt “hoàn cảnh” = 상황, 처지"],
 ["정보","情報","tình báo","thông tin","Tiếng Việt “tình báo” = 첩보"],
 ["생산","生産","sinh sản","sản xuất","Tiếng Việt “sinh sản” = 번식, 출산"],
 ["방문","訪問","phỏng vấn","thăm viếng","Tiếng Việt “phỏng vấn” = 인터뷰, 면접"],
 ["공부","工夫","công phu","học, học bài","Tiếng Việt “công phu” = 공들임, 정성"],
 ["동정","同情","đồng tình","thương cảm, đồng cảm","Tiếng Việt “đồng tình” = 동의, 찬성"],
 ["감독","監督","giám đốc","đạo diễn, huấn luyện viên, giám sát","Tiếng Việt “giám đốc” = 사장, 원장, 이사"],
 ["학원","學院","học viện","trung tâm học thêm tư nhân","Tiếng Việt “học viện” ≈ 대학, 아카데미"],
 ["계산","計算","kế toán","tính toán; thanh toán tiền","Tiếng Việt “kế toán” = 회계"],
 ["공식","公式","công thức","chính thức (còn có nghĩa “công thức” toán)","Tiếng Việt “công thức nấu ăn” = 레시피"],
 ["심판","審判","thẩm phán","trọng tài; sự phán xét","Tiếng Việt “thẩm phán” = 판사"],
 ["인간","人間","nhân gian","con người","Tiếng Việt “nhân gian” = 세상, 민간"],
 ["약속","約束","ước thúc","lời hẹn, lời hứa","Tiếng Việt “ước thúc” (cũ) = ràng buộc"],
 ["질문","質問","chất vấn","câu hỏi thông thường","Tiếng Việt “chất vấn” mang tính truy hỏi = 추궁, 질의"]
];

/* 2. TỪ VỰNG CHUYÊN ĐỀ
   w = từ, h = chữ Hán, m = nghĩa, s = đồng nghĩa, a = trái nghĩa, c = cụm kết hợp (연어), e = ví dụ, ev = dịch ví dụ */
const TOPICS = [
 {id:"pol",name:"Chính trị – xã hội",ko:"정치·사회"},
 {id:"eco",name:"Kinh tế",ko:"경제"},
 {id:"law",name:"Pháp luật – hành chính",ko:"법률·행정"},
 {id:"env",name:"Môi trường",ko:"환경"},
 {id:"sci",name:"Khoa học – công nghệ",ko:"과학·기술"},
 {id:"cul",name:"Văn hóa – nghệ thuật",ko:"문화·예술"},
 {id:"edu",name:"Giáo dục",ko:"교육"},
 {id:"med",name:"Y tế",ko:"의료·보건"},
 {id:"med2",name:"Truyền thông",ko:"언론·미디어"}
];

const VOCAB = [
 // 정치·사회
 {t:"pol",w:"갈등",h:"葛藤",m:"xung đột, mâu thuẫn",s:"대립, 충돌",a:"화합, 조화",c:["갈등을 빚다","갈등이 심화되다","갈등을 해소하다"],e:"세대 간 가치관의 차이로 사회적 갈등이 점차 심화되고 있다.",ev:"Do khác biệt giá trị quan giữa các thế hệ, xung đột xã hội ngày càng sâu sắc."},
 {t:"pol",w:"여론",h:"輿論",m:"dư luận",s:"민심, 공론",a:"",c:["여론을 수렴하다","여론이 들끓다","여론 조사를 실시하다"],e:"정부는 정책을 확정하기에 앞서 다양한 계층의 여론을 수렴할 필요가 있다.",ev:"Trước khi chốt chính sách, chính phủ cần lắng nghe dư luận của nhiều tầng lớp."},
 {t:"pol",w:"양극화",h:"兩極化",m:"sự phân cực",s:"격차 확대",a:"평준화",c:["양극화가 심화되다","소득 양극화","양극화를 완화하다"],e:"소득 양극화가 심화되면서 계층 이동의 가능성이 점점 낮아지고 있다.",ev:"Khi phân cực thu nhập trầm trọng hơn, khả năng dịch chuyển giai tầng ngày càng thấp."},
 {t:"pol",w:"논란",h:"論難",m:"tranh cãi, tranh luận gay gắt",s:"논쟁, 시비",a:"",c:["논란이 일다","논란을 빚다","논란에 휩싸이다"],e:"해당 법안은 표현의 자유를 침해할 소지가 있다는 이유로 거센 논란에 휩싸였다.",ev:"Dự luật đó vướng vào tranh cãi dữ dội vì có khả năng xâm phạm tự do ngôn luận."},
 {t:"pol",w:"저출산",h:"低出産",m:"tỷ lệ sinh thấp",s:"출산율 저하",a:"다산",c:["저출산 현상","저출산·고령화","저출산 문제를 해결하다"],e:"저출산이 장기화되면 생산 가능 인구가 감소하여 경제 성장이 둔화될 수 있다.",ev:"Nếu tỷ lệ sinh thấp kéo dài, dân số trong độ tuổi lao động giảm và tăng trưởng kinh tế có thể chậm lại."},
 // 경제
 {t:"eco",w:"경기",h:"景氣",m:"tình hình kinh tế, nhịp kinh doanh",s:"경제 상황",a:"",c:["경기가 침체되다","경기가 회복되다","경기를 부양하다"],e:"정부는 침체된 경기를 부양하기 위해 대규모 재정 지출을 단행했다.",ev:"Chính phủ đã mạnh tay chi tiêu tài khóa quy mô lớn để kích thích nền kinh tế trì trệ."},
 {t:"eco",w:"물가",h:"物價",m:"vật giá, giá cả",s:"",a:"",c:["물가가 치솟다","물가를 안정시키다","물가 상승률"],e:"원자재 가격이 급등하면서 소비자 물가 상승률이 3개월 연속 4%를 웃돌았다.",ev:"Do giá nguyên liệu tăng vọt, tỷ lệ tăng giá tiêu dùng vượt 4% ba tháng liên tiếp."},
 {t:"eco",w:"투자",h:"投資",m:"đầu tư",s:"출자",a:"회수",c:["투자를 유치하다","투자를 확대하다","투자 심리"],e:"지방 정부는 세제 혜택을 앞세워 외국인 투자를 유치하는 데 총력을 기울이고 있다.",ev:"Chính quyền địa phương dồn toàn lực thu hút đầu tư nước ngoài bằng ưu đãi thuế."},
 {t:"eco",w:"위축",h:"萎縮",m:"co lại, thu hẹp, chùn xuống",s:"감소, 침체",a:"활성화",c:["소비가 위축되다","투자 심리가 위축되다"],e:"금리 인상으로 가계 부담이 커지자 소비 심리가 크게 위축되었다.",ev:"Lãi suất tăng làm gánh nặng hộ gia đình lớn hơn, tâm lý tiêu dùng chùn xuống rõ rệt."},
 {t:"eco",w:"불황",h:"不況",m:"suy thoái, ế ẩm",s:"불경기, 침체",a:"호황",c:["불황에 빠지다","불황을 극복하다","장기 불황"],e:"장기 불황 속에서도 일부 기업은 기술 혁신을 통해 오히려 매출을 늘렸다.",ev:"Giữa suy thoái kéo dài, một số doanh nghiệp vẫn tăng doanh thu nhờ đổi mới công nghệ."},
 // 법률·행정
 {t:"law",w:"시행",h:"施行",m:"thi hành, có hiệu lực",s:"실시",a:"",c:["법을 시행하다","시행에 들어가다","시행령"],e:"개정된 개인정보 보호법은 내년 1월부터 본격적으로 시행에 들어간다.",ev:"Luật bảo vệ thông tin cá nhân sửa đổi sẽ chính thức có hiệu lực từ tháng 1 năm sau."},
 {t:"law",w:"규제",h:"規制",m:"quy định hạn chế, sự điều tiết",s:"제한",a:"완화",c:["규제를 강화하다","규제를 완화하다","규제를 받다"],e:"정부는 신산업 육성을 위해 불필요한 규제를 과감히 완화하기로 했다.",ev:"Chính phủ quyết định mạnh dạn nới lỏng các quy định không cần thiết để nuôi dưỡng ngành mới."},
 {t:"law",w:"위반",h:"違反",m:"vi phạm",s:"위배",a:"준수",c:["법을 위반하다","규정 위반","위반 시 처벌을 받다"],e:"이를 위반할 경우 관련 법령에 따라 과태료가 부과될 수 있다.",ev:"Trường hợp vi phạm, có thể bị phạt tiền theo pháp luật liên quan."},
 {t:"law",w:"권리",h:"權利",m:"quyền lợi, quyền",s:"권한",a:"의무",c:["권리를 행사하다","권리를 보장하다","권리를 침해하다"],e:"모든 국민은 법 앞에 평등하며 자신의 권리를 정당하게 행사할 수 있어야 한다.",ev:"Mọi công dân bình đẳng trước pháp luật và phải được thực hiện quyền của mình một cách chính đáng."},
 {t:"law",w:"개정",h:"改正",m:"sửa đổi (luật, quy định)",s:"수정",a:"",c:["법을 개정하다","개정안을 발의하다","헌법 개정"],e:"여야는 선거법 개정안을 두고 막판까지 첨예하게 대립했다.",ev:"Đảng cầm quyền và đối lập đối đầu gay gắt đến phút chót về dự thảo sửa đổi luật bầu cử."},
 // 환경
 {t:"env",w:"오염",h:"汚染",m:"ô nhiễm",s:"",a:"정화",c:["환경 오염","오염을 유발하다","대기 오염"],e:"무분별한 개발로 인한 토양 오염은 생태계 전반에 심각한 영향을 미친다.",ev:"Ô nhiễm đất do phát triển bừa bãi gây ảnh hưởng nghiêm trọng đến toàn bộ hệ sinh thái."},
 {t:"env",w:"배출",h:"排出",m:"thải ra, phát thải",s:"방출",a:"흡수",c:["온실가스를 배출하다","배출량을 줄이다","탄소 배출"],e:"각국은 탄소 배출량을 실질적으로 0으로 만드는 탄소 중립을 목표로 하고 있다.",ev:"Các nước đặt mục tiêu trung hòa carbon, tức đưa phát thải ròng về 0."},
 {t:"env",w:"고갈",h:"枯渴",m:"cạn kiệt",s:"바닥나다",a:"",c:["자원이 고갈되다","고갈 위기"],e:"화석 연료가 고갈될 것에 대비해 재생 에너지 개발이 시급하다.",ev:"Để chuẩn bị cho việc nhiên liệu hóa thạch cạn kiệt, phát triển năng lượng tái tạo là cấp bách."},
 {t:"env",w:"지속 가능하다",h:"持續 可能",m:"bền vững",s:"",a:"",c:["지속 가능한 발전","지속 가능성을 확보하다"],e:"지속 가능한 발전을 위해서는 경제 성장과 환경 보전이 균형을 이루어야 한다.",ev:"Để phát triển bền vững, tăng trưởng kinh tế và bảo tồn môi trường phải cân bằng."},
 {t:"env",w:"생태계",h:"生態系",m:"hệ sinh thái",s:"",a:"",c:["생태계를 파괴하다","생태계를 보전하다","생태계 교란"],e:"외래종의 유입은 토종 생물의 서식지를 위협하여 생태계 교란을 일으킨다.",ev:"Sự xâm nhập của loài ngoại lai đe dọa môi trường sống của sinh vật bản địa, gây xáo trộn hệ sinh thái."},
 // 과학·기술
 {t:"sci",w:"혁신",h:"革新",m:"đổi mới, cách tân",s:"쇄신",a:"보수",c:["기술 혁신","혁신을 이루다","혁신을 주도하다"],e:"인공지능 기술의 혁신은 산업 구조 전반에 근본적인 변화를 가져오고 있다.",ev:"Đổi mới công nghệ AI đang mang lại thay đổi căn bản cho toàn bộ cơ cấu công nghiệp."},
 {t:"sci",w:"도입",h:"導入",m:"đưa vào áp dụng",s:"채택",a:"폐지",c:["제도를 도입하다","기술을 도입하다","도입을 검토하다"],e:"일부 기업은 업무 효율을 높이기 위해 주 4일 근무제 도입을 검토하고 있다.",ev:"Một số doanh nghiệp đang xem xét áp dụng chế độ làm việc 4 ngày/tuần để nâng hiệu suất."},
 {t:"sci",w:"상용화",h:"商用化",m:"thương mại hóa",s:"실용화",a:"",c:["상용화되다","상용화를 앞두다"],e:"자율 주행 기술이 상용화되면 사고 책임 소재를 둘러싼 법적 논의가 필요하다.",ev:"Khi công nghệ tự lái được thương mại hóa, cần thảo luận pháp lý về việc xác định trách nhiệm tai nạn."},
 {t:"sci",w:"부작용",h:"副作用",m:"tác dụng phụ, hệ quả xấu",s:"역효과",a:"",c:["부작용을 낳다","부작용을 초래하다","부작용이 우려되다"],e:"기술 발전은 편리함을 주는 동시에 개인정보 유출이라는 부작용을 낳기도 한다.",ev:"Tiến bộ công nghệ vừa mang lại tiện lợi, vừa sinh ra tác dụng phụ là rò rỉ thông tin cá nhân."},
 {t:"sci",w:"대체하다",h:"代替",m:"thay thế",s:"대신하다",a:"",c:["인력을 대체하다","대체 에너지"],e:"단순 반복 업무는 점차 로봇과 인공지능으로 대체될 전망이다.",ev:"Các công việc lặp lại đơn giản được dự báo sẽ dần bị robot và AI thay thế."},
 // 문화·예술
 {t:"cul",w:"계승",h:"繼承",m:"kế thừa",s:"전승",a:"단절",c:["전통을 계승하다","계승·발전시키다"],e:"전통문화를 보존하는 데 그치지 않고 현대적으로 계승·발전시키는 노력이 필요하다.",ev:"Cần nỗ lực không chỉ bảo tồn mà còn kế thừa và phát triển văn hóa truyền thống theo hướng hiện đại."},
 {t:"cul",w:"다양성",h:"多樣性",m:"tính đa dạng",s:"",a:"획일성",c:["문화 다양성","다양성을 존중하다"],e:"다문화 사회에서는 서로의 문화적 다양성을 존중하는 태도가 무엇보다 중요하다.",ev:"Trong xã hội đa văn hóa, thái độ tôn trọng sự đa dạng văn hóa của nhau là quan trọng hơn hết."},
 {t:"cul",w:"정체성",h:"正體性",m:"bản sắc, bản thể",s:"",a:"",c:["정체성을 확립하다","정체성을 잃다","문화적 정체성"],e:"세계화가 진행될수록 고유한 문화적 정체성을 지키는 일은 더욱 중요해진다.",ev:"Toàn cầu hóa càng tiến triển, việc giữ gìn bản sắc văn hóa riêng càng trở nên quan trọng."},
 {t:"cul",w:"향유하다",h:"享有",m:"thụ hưởng",s:"누리다",a:"",c:["문화를 향유하다","향유 기회"],e:"지역 간 문화 격차를 줄여 누구나 문화를 향유할 수 있는 환경을 조성해야 한다.",ev:"Cần thu hẹp chênh lệch văn hóa giữa các vùng để tạo môi trường ai cũng được thụ hưởng văn hóa."},
 {t:"cul",w:"창작",h:"創作",m:"sáng tác",s:"",a:"모방",c:["창작 활동","창작 의욕을 고취하다"],e:"저작권 보호는 창작자의 창작 의욕을 고취하는 데 필수적이다.",ev:"Bảo hộ bản quyền là thiết yếu để khích lệ tinh thần sáng tác của người sáng tạo."},
 // 교육
 {t:"edu",w:"사교육",h:"私敎育",m:"giáo dục tư (học thêm ngoài trường)",s:"",a:"공교육",c:["사교육비 부담","사교육에 의존하다"],e:"과도한 사교육비 부담은 저출산의 원인 중 하나로 지목되고 있다.",ev:"Gánh nặng chi phí học thêm quá mức được chỉ ra là một nguyên nhân của tỷ lệ sinh thấp."},
 {t:"edu",w:"역량",h:"力量",m:"năng lực",s:"능력",a:"",c:["역량을 강화하다","역량을 갖추다","핵심 역량"],e:"미래 사회에서는 지식의 양보다 문제 해결 역량과 협업 능력이 더 중시될 것이다.",ev:"Xã hội tương lai sẽ coi trọng năng lực giải quyết vấn đề và hợp tác hơn lượng kiến thức."},
 {t:"edu",w:"주입식",h:"注入式",m:"kiểu nhồi nhét",s:"암기식",a:"자기주도식",c:["주입식 교육"],e:"주입식 교육은 학생들의 창의성과 비판적 사고력을 저해한다는 비판을 받는다.",ev:"Giáo dục nhồi nhét bị phê phán là kìm hãm sáng tạo và tư duy phản biện của học sinh."},
 {t:"edu",w:"격차",h:"隔差",m:"khoảng cách, chênh lệch",s:"차이",a:"",c:["격차가 벌어지다","격차를 줄이다","교육 격차"],e:"지역 간 교육 격차가 벌어지면서 기회의 불평등 문제가 대두되고 있다.",ev:"Chênh lệch giáo dục giữa các vùng nới rộng làm nổi lên vấn đề bất bình đẳng cơ hội."},
 {t:"edu",w:"함양",h:"涵養",m:"bồi dưỡng, hun đúc (phẩm chất)",s:"기르다",a:"",c:["인성을 함양하다","시민 의식 함양"],e:"학교 교육의 궁극적인 목표는 민주 시민으로서의 소양을 함양하는 데 있다.",ev:"Mục tiêu tối thượng của giáo dục nhà trường là bồi dưỡng tố chất của một công dân dân chủ."},
 // 의료·보건
 {t:"med",w:"예방",h:"豫防",m:"phòng ngừa",s:"방지",a:"",c:["질병을 예방하다","예방 접종","예방 차원에서"],e:"감염병 확산을 막기 위해서는 치료보다 예방에 중점을 둔 정책이 필요하다.",ev:"Để ngăn dịch bệnh lan rộng, cần chính sách chú trọng phòng ngừa hơn điều trị."},
 {t:"med",w:"감염",h:"感染",m:"lây nhiễm",s:"전염",a:"",c:["감염되다","감염 경로","감염 확산"],e:"방역 당국은 감염 경로가 불분명한 확진자가 늘자 경계를 강화했다.",ev:"Khi số ca nhiễm không rõ nguồn lây tăng, cơ quan phòng dịch đã nâng mức cảnh giác."},
 {t:"med",w:"고령화",h:"高齡化",m:"già hóa (dân số)",s:"노령화",a:"",c:["고령화가 가속화되다","고령화 사회","초고령 사회에 진입하다"],e:"고령화가 급속히 진행되면서 노인 의료비 지출이 해마다 크게 늘고 있다.",ev:"Do già hóa diễn ra nhanh, chi phí y tế cho người cao tuổi tăng mạnh mỗi năm."},
 {t:"med",w:"처방",h:"處方",m:"kê đơn, đơn thuốc",s:"",a:"",c:["약을 처방하다","처방을 받다","처방전"],e:"항생제는 반드시 의사의 처방을 받아 정해진 기간 동안 복용해야 한다.",ev:"Kháng sinh nhất định phải có đơn của bác sĩ và uống đúng thời gian quy định."},
 {t:"med",w:"사각지대",h:"死角地帶",m:"vùng bị bỏ sót, góc khuất (chính sách)",s:"",a:"",c:["사각지대에 놓이다","사각지대를 해소하다","의료 사각지대"],e:"농어촌 지역의 고령층은 여전히 의료 사각지대에 놓여 있다.",ev:"Người cao tuổi ở nông thôn, làng chài vẫn nằm trong vùng bị bỏ sót về y tế."},
 // 언론·미디어
 {t:"med2",w:"보도",h:"報道",m:"đưa tin, bản tin",s:"",a:"",c:["보도하다","보도 자료를 배포하다","언론 보도"],e:"일부 언론의 자극적인 보도가 사회적 불안을 부추긴다는 지적이 나온다.",ev:"Có ý kiến chỉ ra rằng cách đưa tin giật gân của một số báo chí đang kích động bất an xã hội."},
 {t:"med2",w:"허위",h:"虛僞",m:"sai sự thật, giả dối",s:"거짓",a:"사실, 진실",c:["허위 사실을 유포하다","허위 정보"],e:"허위 정보가 빠르게 확산되면서 이를 규제해야 한다는 목소리가 높아지고 있다.",ev:"Khi thông tin sai lệch lan nhanh, tiếng nói đòi kiểm soát nó ngày càng lớn."},
 {t:"med2",w:"신뢰도",h:"信賴度",m:"độ tin cậy",s:"",a:"",c:["신뢰도가 떨어지다","신뢰도를 높이다"],e:"오보가 잇따르면서 언론에 대한 국민의 신뢰도가 크게 하락했다.",ev:"Do tin sai liên tiếp, độ tin cậy của người dân đối với báo chí giảm mạnh."},
 {t:"med2",w:"파급 효과",h:"波及效果",m:"hiệu ứng lan tỏa",s:"",a:"",c:["파급 효과가 크다","파급 효과를 미치다"],e:"유명인의 발언은 소셜 미디어를 통해 큰 파급 효과를 낳는다.",ev:"Phát ngôn của người nổi tiếng tạo hiệu ứng lan tỏa lớn qua mạng xã hội."},
 {t:"med2",w:"편향",h:"偏向",m:"thiên lệch",s:"편파",a:"중립",c:["편향된 시각","확증 편향","편향성을 띠다"],e:"추천 알고리즘은 이용자를 편향된 정보에 가둘 수 있다는 우려를 낳고 있다.",ev:"Thuật toán đề xuất làm dấy lên lo ngại có thể giam người dùng trong thông tin thiên lệch."}
];

/* 3. NGỮ PHÁP CAO CẤP
   f = mẫu, m = ý nghĩa, n = sắc thái, r = ràng buộc, err = lỗi người Việt hay mắc
   ex = [câu Hàn, dịch]; phần trong {ngoặc nhọn} được tô màu */
const GRAMMAR = [
 {id:"g1",f:"-는 바람에",m:"vì (bất ngờ)… nên…",n:"Nguyên nhân đột ngột, ngoài ý muốn dẫn đến kết quả thường là tiêu cực. Người nói không chủ động.",r:"Chỉ gắn với động từ, luôn dùng dạng -는 kể cả việc đã qua. Vế sau ở thì quá khứ; không dùng câu mệnh lệnh, rủ rê, dự định.",err:"Dùng với tính từ (✗ 날씨가 추운 바람에) hoặc cho kết quả tốt; viết ✗ -ㄴ 바람에.",ex:[
  ["갑자기 폭설이 {쏟아지는 바람에} 항공편이 무더기로 결항되었다.","Vì tuyết bất ngờ đổ xuống dày đặc nên hàng loạt chuyến bay bị hủy."],
  ["접속자가 한꺼번에 {몰리는 바람에} 신청 사이트가 한때 마비되었다.","Do người truy cập dồn vào cùng lúc nên trang đăng ký có lúc bị tê liệt."],
  ["회의가 예정보다 {길어지는 바람에} 기자 회견이 한 시간 늦게 시작되었다.","Vì cuộc họp kéo dài hơn dự kiến nên họp báo bắt đầu muộn một tiếng."]]},
 {id:"g2",f:"-(으)ㄴ/는 탓에",m:"tại vì, do (lỗi của)…",n:"Nhấn mạnh nguyên nhân đáng trách dẫn tới kết quả xấu; có hàm ý quy trách nhiệm.",r:"Gắn được động từ, tính từ, danh từ + 인 탓에. Quá khứ: -(으)ㄴ 탓에 / -았던 탓에. Vế sau không mệnh lệnh, rủ rê.",err:"Dùng cho kết quả tích cực (khi đó phải dùng 덕분에).",ex:[
  ["초기 대응이 {미흡했던 탓에} 피해 규모가 걷잡을 수 없이 커졌다.","Vì ứng phó ban đầu thiếu sót nên quy mô thiệt hại lớn đến mức không kiểm soát nổi."],
  ["수요 예측에 {실패한 탓에} 재고가 산더미처럼 쌓였다.","Do dự báo nhu cầu thất bại nên hàng tồn kho chất như núi."],
  ["경험이 {부족한 탓에} 협상에서 불리한 조건을 받아들일 수밖에 없었다.","Vì thiếu kinh nghiệm nên đành phải chấp nhận điều kiện bất lợi trong đàm phán."]]},
 {id:"g3",f:"-(으)ㄴ/는 덕분에",m:"nhờ…",n:"Nguyên nhân tích cực, thể hiện lòng biết ơn hoặc ghi nhận.",r:"Động từ, tính từ, danh từ + 덕분에. Kết quả tích cực.",err:"Dùng cho kết quả xấu (chỉ được khi mỉa mai).",ex:[
  ["정부의 신속한 지원 {덕분에} 피해 기업들이 빠르게 정상화되었다.","Nhờ hỗ trợ nhanh chóng của chính phủ, các doanh nghiệp bị thiệt hại đã sớm trở lại bình thường."],
  ["시민들이 적극적으로 {협조해 준 덕분에} 행사가 무사히 마무리되었다.","Nhờ người dân tích cực hợp tác nên sự kiện kết thúc suôn sẻ."],
  ["꾸준히 연구 개발에 {투자한 덕분에} 그 기업은 기술 경쟁력을 확보할 수 있었다.","Nhờ đầu tư đều đặn vào R&D, doanh nghiệp đó đã có được năng lực cạnh tranh công nghệ."]]},
 {id:"g4",f:"-기는커녕",m:"chẳng những không… mà (ngược lại) còn…",n:"Phủ định mạnh vế trước, vế sau là điều trái ngược hoặc ở mức thấp hơn nữa; hay đi với 오히려, -도.",r:"Động từ, tính từ; danh từ + 은/는커녕.",err:"Dùng như -(으)ㄹ 뿐만 아니라 để bổ sung ý cùng chiều.",ex:[
  ["규제를 강화했지만 범죄가 {줄기는커녕} 오히려 더 교묘해졌다.","Đã siết quy định nhưng tội phạm chẳng những không giảm mà còn tinh vi hơn."],
  ["그는 사과를 {하기는커녕} 책임을 피해자에게 떠넘겼다.","Anh ta chẳng những không xin lỗi mà còn đổ trách nhiệm cho nạn nhân."],
  ["올해는 {흑자는커녕} 적자를 면하기도 어려운 상황이다.","Năm nay đừng nói có lãi, ngay cả tránh lỗ cũng khó."]]},
 {id:"g5",f:"-(으)ㄹ 뿐만 아니라",m:"không những… mà còn…",n:"Bổ sung thông tin cùng chiều (cùng tốt hoặc cùng xấu). Văn viết rất hay dùng.",r:"Quá khứ: -았/었을 뿐만 아니라. Danh từ + 뿐만 아니라 / 일 뿐만 아니라.",err:"Nối hai vế ngược chiều (khi đó dùng -지만, -는 반면).",ex:[
  ["이 정책은 실효성이 {떨어질 뿐만 아니라} 형평성 측면에서도 문제가 있다.","Chính sách này không những kém hiệu quả mà còn có vấn đề về tính công bằng."],
  ["재생 에너지는 {친환경적일 뿐만 아니라} 장기적으로 경제성도 높다.","Năng lượng tái tạo không những thân thiện môi trường mà về lâu dài còn hiệu quả kinh tế cao."],
  ["그는 학문적 업적을 {남겼을 뿐만 아니라} 후학 양성에도 힘썼다.","Ông không những để lại thành tựu học thuật mà còn dốc sức đào tạo thế hệ sau."]]},
 {id:"g6",f:"-는 한",m:"chừng nào còn…, trừ khi…",n:"Nêu điều kiện tiên quyết; rất hay đi với phủ định -지 않는 한 = “trừ khi”.",r:"Chủ yếu gắn động từ và 있다/없다. Cụm cố định: 가능한 한 (trong khả năng có thể).",err:"Gắn với tính từ thông thường (✗ 바쁜 한).",ex:[
  ["근본적인 원인을 {해결하지 않는 한} 같은 문제는 반복될 수밖에 없다.","Chừng nào chưa giải quyết nguyên nhân gốc rễ thì vấn đề tương tự ắt sẽ lặp lại."],
  ["법이 {존재하는 한} 누구도 그 적용에서 예외가 될 수 없다.","Chừng nào luật còn tồn tại, không ai được ngoại lệ khỏi việc áp dụng nó."],
  ["특별한 사정이 {없는 한} 계약은 자동으로 연장된다.","Trừ khi có lý do đặc biệt, hợp đồng sẽ tự động gia hạn."]]},
 {id:"g7",f:"-(으)ㄹ지언정",m:"thà… chứ (quyết) không…",n:"Thể hiện ý chí rất mạnh; văn phong trang trọng, hơi cổ.",r:"Vế sau thường là phủ định thể hiện quyết tâm của chủ thể.",err:"Dùng trong hội thoại thường ngày hoặc khi không có sắc thái quyết tâm.",ex:[
  ["굶어 {죽을지언정} 부정한 돈은 받지 않겠다.","Thà chết đói chứ không nhận đồng tiền bất chính."],
  ["비록 {실패할지언정} 원칙을 굽히지는 않을 것이다.","Dù có thất bại cũng không bẻ cong nguyên tắc."],
  ["조금 {늦을지언정} 정확성을 포기할 수는 없다.","Thà chậm một chút chứ không thể từ bỏ sự chính xác."]]},
 {id:"g8",f:"-기 마련이다",m:"lẽ tự nhiên là…, ắt sẽ…",n:"Diễn đạt quy luật chung, chân lý hiển nhiên.",r:"Không dùng cho sự việc cá biệt, cụ thể một lần.",err:"Dùng cho dự đoán cụ thể (✗ 내일 비가 오기 마련이다).",ex:[
  ["급격한 변화에는 저항이 {따르기 마련이다}.","Thay đổi đột ngột thì ắt sẽ gặp phản kháng."],
  ["권력이 한곳에 집중되면 {부패하기 마련이다}.","Quyền lực tập trung một chỗ thì tất yếu sẽ tha hóa."],
  ["아무리 완벽한 제도라도 허점은 {있기 마련이다}.","Chế độ dù hoàn hảo đến đâu cũng tất có kẽ hở."]]},
 {id:"g9",f:"-는 셈이다",m:"coi như là…, tính ra là…",n:"Kết luận suy ra từ số liệu hay tình huống, không hoàn toàn chính xác tuyệt đối.",r:"Quá khứ: -(으)ㄴ 셈이다. Danh từ + 인 셈이다.",err:"Dùng khi nêu sự thật chính xác, không qua suy tính.",ex:[
  ["응답자 열 명 중 일곱 명이 찬성했으니 대다수가 {찬성한 셈이다}.","Bảy trên mười người trả lời tán thành, coi như đa số đã tán thành."],
  ["월급의 절반을 주거비로 쓰니 사실상 집을 위해 {일하는 셈이다}.","Tiêu nửa lương vào nhà ở, tính ra thực chất là làm việc vì căn nhà."],
  ["준우승도 큰 성과이니 목표를 어느 정도 {달성한 셈이다}.","Á quân cũng là thành tích lớn, coi như đã đạt mục tiêu phần nào."]]},
 {id:"g10",f:"-(으)ㄹ 법하다",m:"hoàn toàn có thể…, đáng lẽ (là hợp lý)",n:"Đánh giá một khả năng là hợp lẽ, dễ hiểu. Hay dùng -(으)ㄹ 법도 하다.",r:"Động từ, tính từ. Thường dùng để thông cảm, lý giải.",err:"Hiểu nhầm là “luật” (法) hoặc dùng như nghĩa vụ -아야 하다.",ex:[
  ["그 정도로 무리했으면 몸살이 {날 법도 하다}.","Làm quá sức đến thế thì bị ốm cũng phải thôi."],
  ["같은 문제가 수년간 반복되었으니 시민들이 {분노할 법하다}.","Vấn đề lặp lại suốt nhiều năm, người dân phẫn nộ là dễ hiểu."],
  ["누구라도 그런 상황이라면 {당황할 법한} 일이었다.","Đó là chuyện mà ai ở hoàn cảnh ấy cũng có thể bối rối."]]},
 {id:"g11",f:"-다시피",m:"như (đã biết / thấy)…; gần như…",n:"Nghĩa 1: dẫn lại điều người nghe đã biết (알다시피, 보시다시피). Nghĩa 2: -다시피 하다 = gần như.",r:"Nghĩa 1 chỉ đi với động từ nhận thức: 알다, 보다, 듣다, 느끼다, 말씀드리다.",err:"Dùng nghĩa 1 với động từ thường (✗ 먹다시피 말했듯이).",ex:[
  ["{보시다시피} 올해 상반기 매출은 전년 대비 15% 증가했습니다.","Như quý vị thấy, doanh thu nửa đầu năm tăng 15% so với năm trước."],
  ["{아시다시피} 이번 개정안의 핵심은 처벌 강화에 있습니다.","Như quý vị đã biết, cốt lõi của dự thảo sửa đổi lần này là tăng nặng chế tài."],
  ["마감을 앞두고 그는 연구실에서 {살다시피 했다}.","Trước hạn chót, anh ấy gần như sống luôn ở phòng nghiên cứu."]]},
 {id:"g12",f:"-는 둥 마는 둥",m:"làm qua loa, như có như không",n:"Phê phán thái độ làm hời hợt, nửa vời.",r:"Lặp cùng một động từ: V-는 둥 마는 둥 하다.",err:"Gắn với tính từ hoặc dùng hai động từ khác nhau.",ex:[
  ["그는 보고서를 {읽는 둥 마는 둥} 하더니 바로 결재해 버렸다.","Ông ta đọc báo cáo qua loa rồi phê duyệt ngay."],
  ["아침을 {먹는 둥 마는 둥} 하고 서둘러 출근했다.","Ăn sáng qua quýt rồi vội vã đi làm."],
  ["회의를 {하는 둥 마는 둥} 해서는 해결책이 나올 리 없다.","Họp hành nửa vời thế thì không thể ra giải pháp."]]},
 {id:"g13",f:"피동 (câu bị động)",m:"bị / được (chủ ngữ chịu tác động)",n:"Ba cách: hậu tố -이/히/리/기- (보이다, 잡히다, 열리다, 안기다); -아/어지다 (밝혀지다); N하다 → N되다 (통과되다). Văn tin tức dùng rất nhiều.",r:"Không phải động từ nào cũng có dạng -이/히/리/기-. Tránh bị động kép.",err:"Bị động kép (✗ 쓰여지다, ✗ 보여지다 → 쓰이다, 보이다); dịch máy móc chữ “bị” bằng -게 되다.",ex:[
  ["사건의 진상이 마침내 {밝혀졌다}.","Sự thật vụ việc cuối cùng đã được làm sáng tỏ."],
  ["이 법안은 지난달 국회에서 {통과되었다}.","Dự luật này đã được Quốc hội thông qua tháng trước."],
  ["오래된 건물이 {헐리고} 그 자리에 공원이 {조성되었다}.","Tòa nhà cũ bị phá dỡ và một công viên được xây ở chỗ đó."]]},
 {id:"g14",f:"사동 (câu sai khiến)",m:"làm cho, khiến, bắt…",n:"-이/히/리/기/우/구/추- (줄이다, 넓히다, 살리다, 옮기다, 키우다, 낮추다): tác động trực tiếp; -게 하다: gián tiếp, để chủ thể tự làm.",r:"Chủ thể gây ra hành động khác chủ thể thực hiện.",err:"Lạm dụng -시키다 khi động từ gốc đã đủ nghĩa (✗ 소개시키다 → 소개하다; ✗ 교육시키다 → 교육하다).",ex:[
  ["정부는 금리를 {낮춰} 경기를 {살리려} 했다.","Chính phủ hạ lãi suất nhằm vực dậy nền kinh tế."],
  ["새로운 정책은 오히려 시장의 불안을 {키웠다}.","Chính sách mới lại làm gia tăng bất an trên thị trường."],
  ["교사는 학생들이 스스로 답을 {찾게 했다}.","Giáo viên để học sinh tự tìm ra câu trả lời."]]},
 {id:"g15",f:"-대요 / -냬요 / -재요 / -래요",m:"(người ta) nói rằng / hỏi rằng / rủ rằng / bảo rằng",n:"Dạng rút gọn của câu gián tiếp + 해요: -다고 해요 → -대요 (trần thuật); -냐고 해요 → -냬요 (nghi vấn); -자고 해요 → -재요 (rủ rê); -(으)라고 해요 → -래요 (mệnh lệnh; N이래요).",r:"Dùng trong văn nói. Văn viết dùng dạng đầy đủ: -다고 한다, -다고 밝혔다.",err:"Nhầm -대요 (truyền đạt lời người khác) với -데요 (kể lại điều chính mình trải nghiệm).",ex:[
  ["내일부터 지하철 요금이 {오른대요}.","Nghe nói từ mai giá vé tàu điện ngầm tăng."],
  ["부장님이 회의가 몇 시에 {시작하냬요}.","Trưởng phòng hỏi mấy giờ cuộc họp bắt đầu."],
  ["팀장님이 오늘 다 같이 {회식하재요}.","Trưởng nhóm rủ hôm nay cả nhóm đi liên hoan."],
  ["교수님이 다음 주까지 과제를 {제출하래요}.","Giáo sư bảo nộp bài tập trước tuần sau."]]},
 {id:"g16",f:"-더니",m:"(đã thấy)… rồi thì…",n:"Hồi tưởng điều người nói quan sát trong quá khứ, nối với sự thay đổi, tương phản hoặc kết quả.",r:"Chủ ngữ vế trước thường là ngôi 2/3 (người khác, sự vật), hai vế cùng chủ ngữ khi nêu kết quả.",err:"Dùng cho hành động của chính mình (✗ 내가 열심히 공부하더니 합격했다 → 공부했더니).",ex:[
  ["어제까지 {맑더니} 오늘은 하루 종일 비가 내린다.","Đến hôm qua trời còn quang, hôm nay thì mưa cả ngày."],
  ["그 기업은 무리하게 사업을 {확장하더니} 결국 파산하고 말았다.","Công ty đó mở rộng kinh doanh quá sức, rốt cuộc phá sản."],
  ["반대하던 주민들이 설명회를 {거치더니} 점차 찬성으로 돌아섰다.","Người dân từng phản đối, sau các buổi giải trình, dần chuyển sang tán thành."]]},
 {id:"g17",f:"-았/었더니",m:"(tôi) đã… thì (phát hiện / kết quả là)…",n:"Hành động của chính người nói trong quá khứ dẫn tới phát hiện hoặc kết quả.",r:"Chủ ngữ vế trước thường là ngôi 1.",err:"Nhầm với -더니 khi kể về người khác.",ex:[
  ["자료를 다시 {검토했더니} 계산 오류가 발견되었다.","Tôi xem lại tài liệu thì phát hiện lỗi tính toán."],
  ["현장에 직접 {가 봤더니} 보도와는 상황이 사뭇 달랐다.","Tôi trực tiếp đến hiện trường thì thấy tình hình khác hẳn tin đưa."],
  ["며칠 밤을 {새웠더니} 몸살이 났다.","Thức trắng mấy đêm nên tôi bị ốm."]]},
 {id:"g18",f:"-는데도 / -(으)ㄴ데도",m:"mặc dù… vậy mà vẫn…",n:"Kết quả trái với kỳ vọng. Cùng nghĩa, khác hình thái: -는데도 cho động từ (hiện tại) và 있다/없다; -(으)ㄴ데도 cho tính từ; -았/었는데도 cho quá khứ; N인데도.",r:"Vế sau không dùng mệnh lệnh, rủ rê.",err:"Gắn sai hình thái (✗ 추는데도 → 추운데도) hoặc nhầm với -는데 (chỉ nêu bối cảnh).",ex:[
  ["경고가 여러 차례 {있었는데도} 아무런 대책이 마련되지 않았다.","Dù đã có cảnh báo nhiều lần, vẫn không có biện pháp nào được đưa ra."],
  ["금리를 {올렸는데도} 집값은 좀처럼 잡히지 않고 있다.","Dù đã tăng lãi suất, giá nhà vẫn chưa hạ nhiệt."],
  ["실업률이 {낮은데도} 체감 경기는 여전히 좋지 않다.","Dù tỷ lệ thất nghiệp thấp, kinh tế người dân cảm nhận vẫn không tốt."]]},
 {id:"g19",f:"-(으)ㄴ/는 반면(에)",m:"trái lại, ngược lại",n:"Đối chiếu hai mặt hoặc hai đối tượng trái ngược.",r:"Hai vế phải đối lập nhau.",err:"Dùng cho hai sự việc cùng chiều.",ex:[
  ["수출은 꾸준히 {증가한 반면} 내수는 침체를 면치 못했다.","Xuất khẩu tăng đều, trái lại tiêu dùng nội địa vẫn trì trệ."],
  ["도시 인구는 {늘어나는 반면} 농촌 인구는 급격히 줄고 있다.","Dân số đô thị tăng, ngược lại dân số nông thôn giảm mạnh."],
  ["이 방식은 비용이 적게 {드는 반면에} 시간이 오래 걸린다.","Cách này tốn ít chi phí nhưng ngược lại mất nhiều thời gian."]]},
 {id:"g20",f:"-(으)ㄹ수록",m:"càng… càng…",n:"Mức độ vế trước tăng kéo theo vế sau thay đổi. Dạng nhấn mạnh: -(으)면 -(으)ㄹ수록.",r:"Động từ, tính từ, N일수록.",err:"Lặp sai: ✗ 많을수록 많을수록; quên -(으)면 trong dạng nhấn mạnh.",ex:[
  ["경쟁이 {치열해질수록} 차별화 전략이 중요해진다.","Cạnh tranh càng gay gắt, chiến lược khác biệt hóa càng quan trọng."],
  ["정보가 {많을수록} 오히려 올바른 판단을 내리기 어려울 수 있다.","Thông tin càng nhiều, có khi càng khó đưa ra phán đoán đúng."],
  ["사회가 {고도화되면 될수록} 전문 인력의 수요는 늘어난다.","Xã hội càng phát triển cao, nhu cầu nhân lực chuyên môn càng tăng."]]},
 {id:"g21",f:"-는 데다(가)",m:"đã… lại còn…",n:"Cộng dồn hai sự việc cùng chiều (thường cùng xấu hoặc cùng tốt).",r:"Quá khứ: -(으)ㄴ 데다가. Tính từ: -(으)ㄴ 데다가.",err:"Nối hai vế khác chiều.",ex:[
  ["원자재 가격이 {오른 데다가} 환율까지 급등해 기업의 부담이 커졌다.","Giá nguyên liệu đã tăng lại thêm tỷ giá tăng vọt, gánh nặng doanh nghiệp càng lớn."],
  ["그 지역은 교통이 {불편한 데다} 편의 시설도 부족하다.","Khu đó giao thông đã bất tiện lại còn thiếu tiện ích."],
  ["인력이 {부족한 데다가} 예산마저 삭감되었다.","Đã thiếu nhân lực, ngân sách lại còn bị cắt giảm."]]},
 {id:"g22",f:"-(으)ㄴ/는 나머지",m:"quá… đến nỗi…",n:"Mức độ quá mức ở vế trước dẫn tới kết quả tiêu cực, ngoài ý muốn.",r:"Thường dùng quá khứ -(으)ㄴ 나머지.",err:"Dùng cho kết quả bình thường hoặc tích cực.",ex:[
  ["성과에 {집착한 나머지} 절차적 정당성을 소홀히 했다.","Quá chạy theo thành tích đến nỗi xem nhẹ tính chính đáng về thủ tục."],
  ["너무 {긴장한 나머지} 준비한 내용을 제대로 발표하지 못했다.","Căng thẳng quá đến nỗi không trình bày được nội dung đã chuẩn bị."],
  ["비용 절감에 {치중한 나머지} 안전 관리에 허점이 생겼다.","Quá chú trọng cắt giảm chi phí nên quản lý an toàn có lỗ hổng."]]},
 {id:"g23",f:"-(으)ㄹ 따름이다",m:"chỉ… mà thôi",n:"Trang trọng, khiêm tốn; hay dùng để bày tỏ cảm xúc (감사할 따름입니다).",r:"Văn trang trọng, phát biểu, văn viết.",err:"Dùng trong văn nói thân mật.",ex:[
  ["저는 맡은 바 임무를 {다했을 따름입니다}.","Tôi chỉ làm tròn nhiệm vụ được giao mà thôi."],
  ["이렇게 큰 상을 주셔서 그저 {감사할 따름입니다}.","Được trao giải lớn thế này, tôi chỉ biết cảm ơn."],
  ["우리는 사실을 있는 그대로 {전달할 따름이다}.","Chúng tôi chỉ truyền đạt sự thật đúng như nó là."]]},
 {id:"g24",f:"-기 십상이다",m:"rất dễ (bị)…",n:"Cảnh báo khả năng cao xảy ra kết quả xấu.",r:"Gắn động từ; kết quả tiêu cực.",err:"Dùng cho kết quả tốt.",ex:[
  ["충분한 검토 없이 정책을 추진하면 {실패하기 십상이다}.","Đẩy mạnh chính sách mà không xem xét kỹ thì rất dễ thất bại."],
  ["출처를 확인하지 않으면 가짜 뉴스를 {퍼뜨리기 십상이다}.","Không kiểm tra nguồn thì rất dễ phát tán tin giả."],
  ["준비 없이 면접에 임하면 {당황하기 십상이다}.","Đi phỏng vấn mà không chuẩn bị thì rất dễ bối rối."]]},
 {id:"g25",f:"-(으)ㄴ/는 마당에",m:"trong tình cảnh (đã)… thế này thì…",n:"Nêu hoàn cảnh đã xảy ra (thường bất lợi) làm căn cứ cho nhận định, câu hỏi tu từ ở vế sau.",r:"Vế sau thường là đánh giá, phản bác.",err:"Dùng cho bối cảnh trung tính, không có ý nhấn mạnh hoàn cảnh.",ex:[
  ["경제가 이렇게 {어려운 마당에} 세금을 올리는 것은 무리이다.","Kinh tế khó khăn thế này mà tăng thuế là quá đáng."],
  ["이미 계약이 {체결된 마당에} 조건을 바꾸자는 것은 말이 안 된다.","Hợp đồng đã ký rồi mà đòi đổi điều kiện thì vô lý."],
  ["모두가 힘을 모아야 {하는 마당에} 서로 책임을 떠넘겨서야 되겠는가?","Lúc mọi người cần đồng lòng thế này mà lại đùn đẩy trách nhiệm sao được?"]]},
 {id:"g26",f:"-(으)ㄴ/는 만큼",m:"vì (đã)… nên tương xứng…; bằng mức…",n:"Nghĩa 1 (trang trọng): nguyên nhân làm căn cứ cho đề xuất, nghĩa vụ ở vế sau. Nghĩa 2: tỷ lệ tương ứng.",r:"Khác -는 바람에, vế sau dùng được -아야 하다, đề xuất.",err:"Nhầm với -(으)ㄹ 만큼 (đến mức).",ex:[
  ["공공 기관은 국민의 세금으로 {운영되는 만큼} 예산을 투명하게 집행해야 한다.","Vì vận hành bằng tiền thuế của dân nên cơ quan công phải chi ngân sách minh bạch."],
  ["사안이 {중대한 만큼} 신중하게 접근할 필요가 있다.","Vì sự việc hệ trọng nên cần tiếp cận thận trọng."],
  ["{노력한 만큼} 결과가 나오기 마련이다.","Nỗ lực bao nhiêu thì kết quả tương xứng bấy nhiêu."]]},
 {id:"g27",f:"-는 가운데",m:"trong bối cảnh…, giữa lúc…",n:"Văn phong tin tức: hai sự việc diễn ra đồng thời, vế trước làm phông nền.",r:"Danh từ + 인 가운데; tính từ -(으)ㄴ 가운데.",err:"Dùng trong hội thoại đời thường.",ex:[
  ["경기 침체가 {장기화되는 가운데} 청년 실업 문제가 더욱 심각해지고 있다.","Trong bối cảnh suy thoái kéo dài, thất nghiệp thanh niên càng nghiêm trọng."],
  ["많은 시민이 {지켜보는 가운데} 기념식이 엄숙하게 거행되었다.","Lễ kỷ niệm được cử hành trang nghiêm trước sự chứng kiến của đông đảo người dân."],
  ["전국적으로 폭염이 {이어지는 가운데} 전력 수요가 사상 최고치를 기록했다.","Giữa lúc nắng nóng kéo dài cả nước, nhu cầu điện lập kỷ lục."]]},
 {id:"g28",f:"-고자",m:"để, nhằm…",n:"Mục đích, văn phong trang trọng (báo cáo, luận văn, phát biểu). -고자 하다 = muốn, định.",r:"Chủ ngữ hai vế giống nhau.",err:"Dùng trong văn nói thân mật; chủ ngữ hai vế khác nhau.",ex:[
  ["본 연구는 청년층의 주거 실태를 {파악하고자} 설문 조사를 실시하였다.","Nghiên cứu này tiến hành khảo sát nhằm nắm bắt thực trạng nhà ở của thanh niên."],
  ["정부는 지역 균형 발전을 {도모하고자} 공공 기관을 지방으로 이전했다.","Chính phủ di dời cơ quan công về địa phương nhằm thúc đẩy phát triển cân bằng vùng."],
  ["이 글에서는 원격 근무의 장단점을 {살펴보고자 한다}.","Bài viết này muốn xem xét ưu nhược điểm của làm việc từ xa."]]},
 {id:"g29",f:"-(으)ㅁ에도 불구하고",m:"mặc dù…",n:"Nhượng bộ, văn viết trang trọng.",r:"Danh từ + 에도 불구하고.",err:"Lạm dụng trong văn nói; thiếu -(으)ㅁ (✗ 마련되었에도).",ex:[
  ["각종 지원책이 {마련되었음에도 불구하고} 출산율은 계속 하락하고 있다.","Mặc dù có nhiều chính sách hỗ trợ, tỷ lệ sinh vẫn tiếp tục giảm."],
  ["{악천후에도 불구하고} 수많은 관중이 경기장을 찾았다.","Mặc dù thời tiết xấu, rất đông khán giả vẫn đến sân."],
  ["반대가 {거셌음에도 불구하고} 그는 개혁을 끝까지 밀어붙였다.","Mặc dù phản đối dữ dội, ông vẫn đẩy cải cách đến cùng."]]},
 {id:"g30",f:"-(으)ㄹ 리가 없다",m:"không lẽ nào, không thể nào…",n:"Phủ định mạnh khả năng dựa trên suy luận. Dạng phản vấn: -(으)ㄹ 리가 있겠는가?",r:"Quá khứ: -았/었을 리가 없다.",err:"Nhầm với -(으)ㄹ 수 없다 (không có khả năng / năng lực làm).",ex:[
  ["그렇게 꼼꼼한 사람이 그런 실수를 {했을 리가 없다}.","Người cẩn thận như thế không lẽ nào lại mắc lỗi đó."],
  ["근거 없는 소문이 {사실일 리가 없다}.","Tin đồn vô căn cứ không thể là sự thật."],
  ["준비 없이 시작한 사업이 {성공할 리가 있겠는가}?","Kinh doanh bắt đầu không chuẩn bị thì sao mà thành công được?"]]}
];

/* Phân biệt mẫu gần nghĩa: cols = tiêu đề cột, rows = [tiêu chí, ...], q = bài tập [câu có ___, [lựa chọn], đáp án index, giải thích] */
const COMPARE = [
 {id:"c1",title:"-는 바람에 / -(으)ㄴ/는 탓에 / -(으)ㄴ/는 덕분에",cols:["Tiêu chí","-는 바람에","-(으)ㄴ/는 탓에","-(으)ㄴ/는 덕분에"],rows:[
   ["Kết quả","Thường tiêu cực, ngoài ý muốn","Tiêu cực","Tích cực"],
   ["Nguyên nhân","Đột ngột, khách quan","Đáng trách, quy lỗi","Đáng biết ơn"],
   ["Kết hợp","Chỉ động từ (-는)","Động từ, tính từ, N인","Động từ, tính từ, N"],
   ["Vế sau","Quá khứ; không mệnh lệnh","Không mệnh lệnh, rủ rê","Tự do hơn"]],
  q:[["갑자기 정전이 ___ 엘리베이터에 30분 동안 갇혀 있었다.",["되는 바람에","된 덕분에","되는데도"],0,"Sự cố bất ngờ, kết quả xấu → -는 바람에."],
     ["동료들이 ___ 프로젝트를 기한 내에 마칠 수 있었다.",["도와주는 바람에","도와준 탓에","도와준 덕분에"],2,"Kết quả tốt, biết ơn → 덕분에."],
     ["관리가 ___ 시설이 빠르게 노후화되었다.",["소홀한 탓에","소홀하는 바람에","소홀한 덕분에"],0,"Tính từ 소홀하다 không đi với -는 바람에; nguyên nhân đáng trách → 탓에."]]},
 {id:"c2",title:"-더니 / -았/었더니",cols:["Tiêu chí","-더니","-았/었더니"],rows:[
   ["Chủ ngữ vế trước","Người khác, sự vật (ngôi 2/3)","Chính người nói (ngôi 1)"],
   ["Bản chất","Điều mình quan sát thấy","Điều mình đã làm"],
   ["Vế sau","Thay đổi, tương phản, kết quả","Phát hiện, phản ứng, kết quả"]],
  q:[["동생이 매일 운동을 ___ 몰라보게 건강해졌다.",["하더니","했더니","하는데도"],0,"Chủ ngữ là em (ngôi 3), mình quan sát → -더니."],
     ["내가 창문을 ___ 시원한 바람이 들어왔다.",["열더니","열었더니","여는 바람에"],1,"Hành động của chính tôi → -았더니."],
     ["아침에는 ___ 오후가 되자 바람이 거세졌다.",["잠잠하더니","잠잠했더니","잠잠한 덕분에"],0,"Thời tiết (sự vật) thay đổi → -더니."]]},
 {id:"c3",title:"-는데도 / -(으)ㄴ데도 / N인데도",cols:["Hình thái","Gắn với","Ví dụ"],rows:[
   ["-는데도","Động từ hiện tại, 있다/없다","비가 오는데도, 돈이 없는데도"],
   ["-(으)ㄴ데도","Tính từ hiện tại","추운데도, 바쁜데도"],
   ["-았/었는데도","Mọi vị từ ở quá khứ","연락했는데도, 비쌌는데도"],
   ["N인데도","Danh từ","전문가인데도"]],
  q:[["날씨가 ___ 많은 사람이 모였다.",["추는데도","추운데도","춥는데도"],1,"춥다 là tính từ → 추운데도."],
     ["여러 번 ___ 답장이 없다.",["연락했는데도","연락한데도","연락하는 반면"],0,"Hành động quá khứ → -았는데도."],
     ["그는 그 분야의 ___ 늘 겸손하다.",["전문가는데도","전문가인데도","전문가한데도"],1,"Danh từ → N인데도."]]},
 {id:"c4",title:"-(으)ㄹ 뿐만 아니라 / -기는커녕",cols:["Tiêu chí","-(으)ㄹ 뿐만 아니라","-기는커녕"],rows:[
   ["Quan hệ hai vế","Cùng chiều, bổ sung","Trái chiều, phủ định vế trước"],
   ["Từ hay đi kèm","-도, 또한","오히려, -도 (못하다)"],
   ["Sắc thái","Trung tính, liệt kê","Thất vọng, bất ngờ"]],
  q:[["이 앱은 무료일 ___ 사용하기도 편하다.",["뿐만 아니라","는커녕","탓에"],0,"Hai ưu điểm cùng chiều."],
     ["상황이 개선되기___ 오히려 악화되었다.",["뿐만 아니라","는커녕","마련이고"],1,"Trái kỳ vọng, có 오히려."]]},
 {id:"c5",title:"-기 마련이다 / -기 십상이다 / -(으)ㄹ 법하다",cols:["Tiêu chí","-기 마련이다","-기 십상이다","-(으)ㄹ 법하다"],rows:[
   ["Ý nghĩa","Quy luật tất yếu","Rất dễ xảy ra (xấu)","Có lý, dễ hiểu"],
   ["Kết quả","Trung tính","Tiêu cực","Trung tính"],
   ["Dùng khi","Nêu chân lý chung","Cảnh báo","Thông cảm, đánh giá"]],
  q:[["사람은 누구나 실수를 하기 ___.",["마련이다","법하다","셈이다"],0,"Chân lý chung."],
     ["확인 없이 서두르면 일을 그르치기 ___.",["십상이다","법하다","셈이다"],0,"Cảnh báo kết quả xấu."],
     ["그렇게 오래 기다렸으니 화가 날 ___ 하다.",["법도","마련도","십상도"],0,"Thông cảm: -(으)ㄹ 법도 하다."]]},
 {id:"c6",title:"-(으)ㄴ/는 만큼 / -(으)ㄹ 만큼",cols:["Tiêu chí","-(으)ㄴ/는 만큼","-(으)ㄹ 만큼"],rows:[
   ["Ý nghĩa","Vì… nên (căn cứ); tương xứng","Đến mức…"],
   ["Vế sau","Đề xuất, nghĩa vụ, nhận định","Mô tả mức độ"],
   ["Ví dụ","중요한 만큼 신중해야 한다","눈물이 날 만큼 감동적이다"]],
  q:[["사안이 ___ 신중하게 결정해야 한다.",["중요한 만큼","중요할 만큼","중요하는 만큼"],0,"Căn cứ → đề xuất."],
     ["눈물이 ___ 감동적인 연설이었다.",["나는 만큼","날 만큼","난 만큼"],1,"Mức độ → -(으)ㄹ 만큼."]]}
];

/* 4. THÀNH NGỮ — type: "sa" 사자성어 | "sd" 속담 | "gw" 관용어 ; h = chữ Hán, v = âm Hán Việt, m = nghĩa, u = tình huống dùng, e = ví dụ */
const IDIOMS = [
 {type:"sa",k:"일석이조",h:"一石二鳥",v:"nhất thạch nhị điểu",m:"một công đôi việc",u:"Khi một hành động mang lại hai lợi ích.",e:"대중교통 이용은 비용도 아끼고 환경도 보호하는 일석이조의 효과가 있다."},
 {type:"sa",k:"역지사지",h:"易地思之",v:"dịch địa tư chi",m:"đặt mình vào vị trí người khác",u:"Khuyên hiểu lập trường đối phương khi có mâu thuẫn.",e:"갈등을 해결하려면 역지사지의 자세로 상대방의 입장을 헤아려야 한다."},
 {type:"sa",k:"우왕좌왕",h:"右往左往",v:"hữu vãng tả vãng",m:"lúng túng, chạy ngược chạy xuôi",u:"Phê phán sự thiếu định hướng khi xử lý tình huống.",e:"사고 직후 당국은 컨트롤 타워 없이 우왕좌왕하는 모습을 보였다."},
 {type:"sa",k:"유비무환",h:"有備無患",v:"hữu bị vô hoạn",m:"có chuẩn bị thì không lo hoạn nạn",u:"Nhấn mạnh phòng bị trước.",e:"유비무환의 자세로 자연재해 대응 매뉴얼을 정비해야 한다."},
 {type:"sa",k:"과유불급",h:"過猶不及",v:"quá do bất cập",m:"thái quá cũng như bất cập",u:"Cảnh báo làm gì quá mức.",e:"규제도 과유불급이라, 지나치면 오히려 혁신을 가로막는다."},
 {type:"sa",k:"사필귀정",h:"事必歸正",v:"sự tất quy chính",m:"mọi việc rồi sẽ về lẽ phải",u:"Khi sự thật, công lý cuối cùng được sáng tỏ.",e:"오랜 법정 공방 끝에 진실이 밝혀지자 사람들은 사필귀정이라며 입을 모았다."},
 {type:"sa",k:"자업자득",h:"自業自得",v:"tự nghiệp tự đắc",m:"tự làm tự chịu, gieo gió gặt bão",u:"Hậu quả do chính mình gây ra.",e:"무리한 차입 경영으로 파산한 것은 자업자득이라 할 수 있다."},
 {type:"sa",k:"동문서답",h:"東問西答",v:"đông vấn tây đáp",m:"hỏi một đằng trả lời một nẻo",u:"Phê phán câu trả lời lảng tránh.",e:"기자의 날카로운 질문에 대변인은 동문서답으로 일관했다."},
 {type:"sa",k:"고진감래",h:"苦盡甘來",v:"khổ tận cam lai",m:"hết khổ đến sướng",u:"Khích lệ, hoặc khi thành quả đến sau gian khổ.",e:"고진감래라더니 수년간의 노력 끝에 마침내 연구 성과를 인정받았다."},
 {type:"sa",k:"이구동성",h:"異口同聲",v:"dị khẩu đồng thanh",m:"mọi người cùng chung một ý",u:"Khi nhiều người cùng nhận định giống nhau.",e:"전문가들은 이구동성으로 근본적인 구조 개혁이 필요하다고 지적했다."},
 {type:"sa",k:"설상가상",h:"雪上加霜",v:"tuyết thượng gia sương",m:"họa vô đơn chí, đã khó lại thêm khó",u:"Khi tình hình xấu lại chồng thêm điều xấu.",e:"경기 침체에 설상가상으로 환율까지 급등했다."},
 {type:"sa",k:"시행착오",h:"試行錯誤",v:"thí hành thác ngộ",m:"thử và sai",u:"Quá trình rút kinh nghiệm từ sai lầm.",e:"새 제도가 정착하기까지는 어느 정도의 시행착오가 불가피하다."},
 {type:"sd",k:"소 잃고 외양간 고친다",m:"mất bò mới lo làm chuồng",u:"Phê phán việc chỉ khắc phục sau khi sự cố xảy ra.",e:"사고가 난 뒤에야 안전 점검에 나선 것은 소 잃고 외양간 고치는 격이다."},
 {type:"sd",k:"가는 말이 고와야 오는 말이 곱다",m:"lời nói đi có đẹp thì lời nói lại mới đẹp",u:"Khuyên cư xử tử tế để được đối xử tử tế.",e:"가는 말이 고와야 오는 말이 곱다고, 고객 응대에서도 존중이 먼저다."},
 {type:"sd",k:"티끌 모아 태산",m:"góp gió thành bão, tích tiểu thành đại",u:"Khuyến khích tích lũy từng chút.",e:"티끌 모아 태산이라고, 작은 절전 습관이 모이면 막대한 에너지를 아낄 수 있다."},
 {type:"sd",k:"백지장도 맞들면 낫다",m:"một cây làm chẳng nên non, ba cây chụm lại…",u:"Nhấn mạnh sức mạnh hợp tác.",e:"백지장도 맞들면 낫다고, 지역 주민들이 힘을 모으자 복구 작업이 빨라졌다."},
 {type:"sd",k:"빈 수레가 요란하다",m:"thùng rỗng kêu to",u:"Chê người ít thực lực mà khoe khoang.",e:"빈 수레가 요란하다더니, 공약만 화려했지 실천은 없었다."},
 {type:"sd",k:"윗물이 맑아야 아랫물이 맑다",m:"thượng bất chính hạ tắc loạn",u:"Người đứng đầu phải làm gương.",e:"윗물이 맑아야 아랫물이 맑은 법이니 고위 공직자부터 청렴해야 한다."},
 {type:"sd",k:"우물 안 개구리",m:"ếch ngồi đáy giếng",u:"Chê tầm nhìn hạn hẹp.",e:"해외 시장을 경험하지 않으면 우물 안 개구리가 되기 십상이다."},
 {type:"sd",k:"원숭이도 나무에서 떨어진다",m:"khỉ cũng có lúc ngã cây (người giỏi cũng có lúc sai)",u:"Khi chuyên gia mắc lỗi.",e:"원숭이도 나무에서 떨어진다고, 베테랑 조종사도 실수할 수 있다."},
 {type:"gw",k:"발이 넓다",m:"quen biết rộng",u:"Người có quan hệ xã hội rộng.",e:"그는 업계에서 발이 넓어 투자자를 쉽게 소개받았다."},
 {type:"gw",k:"손을 떼다",m:"rút tay khỏi, thôi không dính líu",u:"Chấm dứt tham gia một việc.",e:"그 기업은 수익성이 낮은 사업에서 손을 떼기로 결정했다."},
 {type:"gw",k:"머리를 맞대다",m:"chụm đầu bàn bạc",u:"Cùng nhau tìm giải pháp.",e:"노사가 머리를 맞대고 위기 극복 방안을 논의했다."},
 {type:"gw",k:"눈살을 찌푸리다",m:"nhíu mày khó chịu",u:"Hành vi khiến người khác phản cảm.",e:"일부 관광객의 무질서한 행동이 시민들의 눈살을 찌푸리게 했다."},
 {type:"gw",k:"귀가 얇다",m:"cả tin, dễ bị lung lay",u:"Người dễ nghe theo lời người khác.",e:"귀가 얇은 투자자일수록 근거 없는 소문에 휘둘리기 쉽다."},
 {type:"gw",k:"발목을 잡다",m:"níu chân, cản trở",u:"Yếu tố kìm hãm sự phát triển.",e:"낡은 규제가 신산업의 발목을 잡고 있다."},
 {type:"gw",k:"입이 무겁다",m:"kín miệng",u:"Người giữ bí mật tốt.",e:"그는 입이 무거워서 기밀 업무를 맡기기에 적합하다."},
 {type:"gw",k:"박차를 가하다",m:"thúc đẩy mạnh mẽ (thúc ngựa)",u:"Tăng tốc một công việc.",e:"정부는 반도체 산업 육성에 박차를 가하고 있다."},
 {type:"gw",k:"등을 돌리다",m:"quay lưng lại",u:"Từ bỏ ủng hộ, cắt quan hệ.",e:"잇따른 실정에 지지자들마저 등을 돌렸다."},
 {type:"gw",k:"진땀을 빼다",m:"toát mồ hôi hột, vất vả xoay xở",u:"Gặp tình huống khó, phải cố gắng nhiều.",e:"대변인은 쏟아지는 질문에 답하느라 진땀을 뺐다."}
];

/* 5. ĐỌC HIỂU — trong text: {từ} = từ khó bấm được (nghĩa trong gloss); ㉠㉡㉢㉣ = vị trí điền câu
   q = [câu hỏi, [lựa chọn], đáp án index, loại] */
const READINGS = [
 {id:"r1",type:"Tin tức (기사)",title:"주 4일 근무제, 생산성 향상인가 비용 증가인가",
  text:"최근 일부 기업을 중심으로 주 4일 근무제를 {시범적}으로 도입하는 사례가 늘고 있다. 정부도 노동 시간 단축을 위한 지원 방안을 검토하겠다고 밝히면서 관련 논의가 {본격화}되는 {모양새}다. ( ㉠ ) 찬성하는 측은 근무 일수가 줄면 직원들의 피로가 감소하고 업무 집중도가 높아져 오히려 생산성이 향상된다고 주장한다. 실제로 해외의 한 대규모 실험에서는 참여 기업의 상당수가 근무 시간을 줄인 뒤에도 매출이 유지되거나 증가했으며, {이직률}은 눈에 띄게 낮아진 것으로 나타났다. ( ㉡ ) 반면 신중론도 {만만치 않다}. 제조업이나 서비스업처럼 일정한 인력이 현장에 {상주}해야 하는 업종에서는 근무일 축소가 곧 {인건비} 상승으로 이어질 수 있기 때문이다. 특히 자금 {여력}이 부족한 중소기업은 추가 인력을 채용하기 어려워 대기업과의 근로 조건 격차가 더 벌어질 것이라는 우려도 제기된다. ( ㉢ ) 전문가들은 제도의 {일률적}인 시행보다는 업종과 기업 규모에 따라 단계적으로 접근해야 한다고 조언한다. 근무 시간을 줄이는 것 자체가 목적이 되어서는 안 되며, 불필요한 회의와 보고를 줄이는 등 업무 방식의 혁신이 함께 이루어져야 한다는 것이다. ( ㉣ ) 결국 주 4일제의 {성패}는 줄어든 시간만큼 일하는 방식을 얼마나 효율적으로 바꿀 수 있느냐에 달려 있다고 할 수 있다.",
  gloss:{"시범적":"mang tính thí điểm","본격화":"chính thức đẩy mạnh, đi vào giai đoạn chính","모양새":"dáng vẻ, chiều hướng (văn báo chí)","이직률":"tỷ lệ nghỉ việc / chuyển việc","만만치 않다":"không hề nhỏ, không thể xem thường","상주":"thường trú, túc trực","인건비":"chi phí nhân công","여력":"dư lực, khả năng còn lại","일률적":"đồng loạt, rập khuôn một kiểu","성패":"thành bại"},
  q:[["이 글의 중심 내용으로 가장 알맞은 것을 고르십시오.",["주 4일제는 생산성을 높이므로 즉시 전면 시행해야 한다.","주 4일제는 중소기업에 불리하므로 도입해서는 안 된다.","주 4일제는 업종과 규모를 고려해 단계적으로 도입하고 업무 방식 혁신이 동반되어야 한다.","주 4일제는 해외에서만 효과가 입증된 제도이다."],2,"Ý chính"],
     ["다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.<br><b>〈보기〉 이는 노동자의 삶의 질뿐 아니라 기업의 인재 확보에도 긍정적인 영향을 미칠 수 있음을 시사한다.</b>",["㉠","㉡","㉢","㉣"],1,"Điền câu"],
     ["이 글에 나타난 필자의 태도로 가장 알맞은 것을 고르십시오.",["주 4일제를 적극적으로 지지하고 있다.","주 4일제의 도입을 강하게 반대하고 있다.","장단점을 따져 보며 신중한 접근을 강조하고 있다.","제도 변화에 무관심한 태도를 보이고 있다."],2,"Thái độ tác giả"],
     ["이 글의 내용과 같은 것을 고르십시오.",["정부는 주 4일제를 법으로 의무화했다.","해외 실험에서 참여 기업의 이직률이 낮아졌다.","제조업은 근무일을 줄여도 인건비가 줄어든다.","전문가들은 일률적인 시행을 권고한다."],1,"Chi tiết"]]},
 {id:"r2",type:"Xã luận (사설)",title:"[사설] 허위 정보 확산, 플랫폼의 책임 더는 미룰 수 없다",
  text:"선거철이 다가오면서 특정 후보를 겨냥한 허위 정보가 소셜 미디어를 통해 급속히 퍼지고 있다. 정교하게 {조작}된 영상과 그럴듯한 통계로 포장된 거짓 정보는 {진위}를 가리기가 쉽지 않아 유권자의 판단을 흐리기 십상이다. 문제는 이러한 정보가 한번 퍼지고 나면 사후에 {정정 보도}를 내더라도 이미 형성된 인식을 바로잡기 어렵다는 데 있다. ( ㉠ ) 그동안 거대 플랫폼 기업들은 자신들은 정보를 {매개}할 뿐 내용에 대한 책임은 없다는 입장을 {고수}해 왔다. 그러나 이용자의 관심을 끌수록 더 많이 노출되도록 설계된 추천 알고리즘이 자극적인 허위 정보의 확산을 부추겨 왔다는 사실은 부인하기 어렵다. 막대한 광고 수익을 올리면서 그에 따르는 사회적 책임은 {외면}하는 것은 결코 정당화될 수 없다. ( ㉡ ) 물론 표현의 자유를 위축시킬 수 있는 과도한 규제는 경계해야 한다. 정부가 허위 정보의 판단 기준을 {자의적}으로 정한다면 오히려 비판적 목소리를 억압하는 수단으로 {악용}될 수 있기 때문이다. ( ㉢ ) 따라서 정부의 직접적인 개입보다는 플랫폼이 허위 정보 대응 체계와 알고리즘 운영 원칙을 투명하게 공개하도록 의무화하는 방안이 바람직하다. 아울러 시민들이 정보를 비판적으로 읽어 낼 수 있도록 미디어 리터러시 교육을 강화하는 일도 {병행}되어야 할 것이다. ( ㉣ ) 민주주의의 {근간}인 공론장이 거짓에 {잠식}되기 전에 실효성 있는 대책이 마련되기를 {촉구}한다.",
  gloss:{"조작":"thao túng, ngụy tạo","진위":"thật giả","정정 보도":"tin đính chính","매개":"làm trung gian","고수":"khăng khăng giữ (lập trường)","외면":"ngoảnh mặt làm ngơ","자의적":"tùy tiện, chủ quan","악용":"lạm dụng vào việc xấu","병행":"tiến hành song song","근간":"nền tảng, gốc rễ","잠식":"xâm thực, gặm nhấm dần","촉구":"thúc giục, kêu gọi mạnh mẽ"},
  q:[["이 글의 주제로 가장 알맞은 것을 고르십시오.",["허위 정보를 막기 위해 정부가 모든 게시물을 직접 심사해야 한다.","플랫폼은 투명성 의무 등을 통해 허위 정보 확산에 대한 책임을 져야 한다.","표현의 자유를 위해 허위 정보도 보호되어야 한다.","선거 기간에는 소셜 미디어 이용을 제한해야 한다."],1,"Ý chính"],
     ["다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.<br><b>〈보기〉 허위 정보가 민주주의를 흔드는 심각한 위협으로 여겨지는 이유가 바로 여기에 있다.</b>",["㉠","㉡","㉢","㉣"],0,"Điền câu"],
     ["이 글에 나타난 필자의 태도로 가장 알맞은 것을 고르십시오.",["플랫폼 기업의 책임 회피를 비판하고 있다.","정부의 강력한 검열을 옹호하고 있다.","미디어 리터러시 교육의 효과를 의심하고 있다.","알고리즘 기술의 발전을 낙관하고 있다."],0,"Thái độ tác giả"],
     ["이 글의 내용과 같은 것을 고르십시오.",["정정 보도를 내면 잘못된 인식이 쉽게 바로잡힌다.","필자는 정부가 허위 정보 기준을 직접 정해야 한다고 본다.","추천 알고리즘이 자극적인 정보의 확산을 부추겨 왔다.","플랫폼 기업들은 그동안 내용에 대한 책임을 인정해 왔다."],2,"Chi tiết"]]},
 {id:"r3",type:"Văn bản học thuật (학술문)",title:"도시 열섬 현상의 원인과 완화 방안",
  text:"도시 열섬 현상이란 도심의 기온이 주변 {교외} 지역보다 높게 나타나는 현상을 말한다. {등온선}을 그려 보면 도심을 중심으로 마치 섬과 같은 모양이 나타난다는 데서 이러한 명칭이 붙었다. 이 현상은 특히 바람이 약하고 맑은 날 밤에 뚜렷하게 관찰되는데, 대도시의 경우 도심과 교외의 기온 차가 수 도에 이르기도 한다. ( ㉠ ) 열섬 현상의 원인은 크게 세 가지로 설명할 수 있다. 첫째, 아스팔트와 콘크리트 같은 인공 포장재는 낮 동안 태양 에너지를 흡수하여 저장했다가 밤에 서서히 {방출}한다. 둘째, 녹지와 수면이 줄어들면서 식물의 {증산 작용}이나 물의 증발을 통해 열을 식히는 효과가 약해진다. 셋째, 자동차와 냉난방 기기, 공장 등에서 배출되는 {인공 열}이 도심의 기온을 더욱 끌어올린다. ( ㉡ ) 여기에 고층 건물이 {밀집}해 바람길을 막으면 데워진 공기가 빠져나가지 못해 열이 {축적}된다. ( ㉢ ) 열섬 현상은 단순히 불쾌감을 주는 데 그치지 않는다. {열대야} 일수를 늘려 시민의 건강을 위협하고, 냉방 수요를 증가시켜 에너지 소비와 온실가스 배출을 늘리는 {악순환}을 낳는다. 이에 따라 여러 도시에서는 옥상 녹화, {투수성} 포장재 사용, 도시 숲 조성, 바람길을 고려한 건축 배치 등 다양한 완화 방안을 시행하고 있다. ( ㉣ ) 이러한 노력이 실질적인 효과를 거두기 위해서는 개별 사업에 그칠 것이 아니라 도시 계획 단계에서부터 기후를 고려하는 통합적인 접근이 요구된다.",
  gloss:{"교외":"ngoại ô","등온선":"đường đẳng nhiệt","방출":"giải phóng, phát ra","증산 작용":"sự thoát hơi nước (ở thực vật)","인공 열":"nhiệt nhân tạo","밀집":"dày đặc, tập trung","축적":"tích tụ","열대야":"đêm nhiệt đới (đêm nóng trên 25°C)","악순환":"vòng luẩn quẩn","투수성":"tính thấm nước"},
  q:[["이 글을 쓴 목적으로 가장 알맞은 것을 고르십시오.",["열섬 현상이라는 명칭의 유래를 비판하기 위해","열섬 현상의 원인을 분석하고 통합적 대응의 필요성을 제시하기 위해","교외 지역 개발의 장점을 홍보하기 위해","냉방 기기 사용 금지를 주장하기 위해"],1,"Mục đích"],
     ["다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.<br><b>〈보기〉 이처럼 도시의 구조 자체가 열을 가두는 역할을 한다는 점도 간과할 수 없다.</b>",["㉠","㉡","㉢","㉣"],2,"Điền câu"],
     ["이 글의 내용과 같은 것을 고르십시오.",["열섬 현상은 바람이 강한 낮에 가장 뚜렷하다.","녹지가 줄면 열을 식히는 효과가 약해진다.","인공 포장재는 낮에 흡수한 열을 즉시 방출한다.","열섬 현상은 에너지 소비와는 관련이 없다."],1,"Chi tiết"]]}
];

/* 6. LUYỆN VIẾT */
const WRITE_5152 = [
 {no:51,title:"도서관 이용 시간 변경 안내",text:"도서관 이용자 여러분께 알려 드립니다. 다음 달부터 시설 보수 공사로 인해 도서관 이용 시간이 ( ㉠ ). 평일에는 기존과 같이 오후 10시까지 운영하지만, 주말에는 오후 6시에 문을 닫습니다. 공사 기간 동안 열람실 일부 좌석은 이용하실 수 없으니 ( ㉡ ). 이용에 불편을 드려 죄송합니다.",ans:["변경될 예정입니다 / 변경됩니다","이용에 참고하시기 바랍니다 / 양해해 주시기 바랍니다"],tip:"Văn bản thông báo: dùng đuôi -(스)ㅂ니다, -시기 바랍니다; câu ㉡ phải hô ứng với “-(으)니” ở trước (đưa ra yêu cầu/đề nghị)."},
 {no:51,title:"중고 노트북 판매",text:"중고 노트북을 팝니다. 구입한 지 1년밖에 안 되었고 ( ㉠ ) 거의 새것과 같습니다. 직접 만나서 거래하기를 원하며, 택배 거래는 ( ㉡ ). 관심 있으신 분은 아래 번호로 연락 주십시오.",ans:["조심해서 사용했기 때문에 / 거의 사용하지 않아서","하지 않습니다 / 어렵습니다"],tip:"Chú ý liên kết nguyên nhân → kết quả (“거의 새것과 같다”) và sự đối lập “직접 만나서 ↔ 택배”."},
 {no:52,title:"실패의 의미",text:"사람들은 흔히 실패를 부정적으로 생각한다. 그러나 실패는 성공으로 가는 과정에서 반드시 거쳐야 하는 단계이다. 실패를 통해 자신의 부족한 점을 알게 되고 ( ㉠ ). 따라서 실패를 두려워하기보다는 ( ㉡ ).",ans:["이를 보완할 기회를 얻을 수 있기 때문이다","실패에서 교훈을 얻으려는 자세가 필요하다"],tip:"Câu 52 dùng văn viết -다; ㉡ sau “-기보다는” phải là điều nên làm."},
 {no:52,title:"식물의 굴광성",text:"식물은 빛이 있는 방향으로 자라는 성질이 있다. 이를 굴광성이라고 한다. 창가에 둔 화분의 식물이 ( ㉠ ) 바로 이 때문이다. 이러한 현상은 식물 줄기에서 생장을 촉진하는 물질이 빛의 반대쪽에 더 많이 모이기 때문에 일어난다. 즉, 빛을 받지 않는 쪽이 ( ㉡ ) 줄기가 빛 쪽으로 휘어지는 것이다.",ans:["창문 쪽으로 기울어져 자라는 것은","더 빨리 자라기 때문에"],tip:"㉠ phải kết thúc bằng “-는 것은” để hô ứng với “바로 이 때문이다”."}
];

/* Câu 53: data = [[nhãn, giá trị]], type line|bar ; series2 cho biểu đồ cột đôi */
const WRITE_53 = [
 {title:"1인 가구 비율 변화",note:"Số liệu luyện tập (dựa theo xu hướng thống kê dân số Hàn Quốc).",type:"line",unit:"%",data:[["2000",15.5],["2010",23.9],["2020",31.7],["2023",35.5]],extra:["원인: 결혼에 대한 인식 변화, 고령화로 인한 독거노인 증가","전망: 2050년 40% 이상 예상"],
  model:"조사 결과에 따르면 전체 가구 중 1인 가구가 차지하는 비율은 2000년 15.5%에서 2010년 23.9%, 2020년 31.7%로 꾸준히 증가하였으며, 2023년에는 35.5%에 이르렀다. 23년 사이에 두 배 이상 늘어난 셈이다. 이러한 변화의 원인으로는 결혼에 대한 인식 변화와 고령화로 인한 독거노인의 증가를 들 수 있다. 이러한 추세가 지속된다면 2050년에는 1인 가구 비율이 40%를 넘어설 것으로 예상된다."},
 {title:"대학생 아르바이트 목적 (남녀 비교)",note:"Số liệu giả định để luyện tập.",type:"bar",unit:"%",series:["남자","여자"],data:[["용돈 마련",45,38],["학비 마련",25,30],["경력 쌓기",20,22],["기타",10,10]],extra:["조사 대상: 대학생 1,000명"],
  model:"대학생 1,000명을 대상으로 아르바이트를 하는 목적에 대해 조사한 결과, 남녀 모두 ‘용돈 마련’이라고 응답한 비율이 가장 높았으며 남자는 45%, 여자는 38%로 나타났다. 그 뒤를 이어 ‘학비 마련’이 남자 25%, 여자 30%로 조사되어 여자의 응답 비율이 더 높았다. ‘경력 쌓기’는 남자 20%, 여자 22%로 큰 차이가 없었다. 이를 통해 대학생들이 아르바이트를 주로 경제적인 이유로 한다는 것을 알 수 있다."}
];

const PHRASES_53 = [
 ["증가하다 / 늘어나다","tăng"],["감소하다 / 줄어들다","giảm"],["꾸준히 / 급격히 / 소폭","đều đặn / đột ngột / nhẹ"],
 ["A에서 B(으)로 증가하였다","tăng từ A lên B"],["증가 추세를 보이다","cho thấy xu hướng tăng"],["감소세로 돌아서다","chuyển sang xu hướng giảm"],
 ["두 배 이상 늘어났다","tăng hơn gấp đôi"],["가장 높은 비율을 차지하다","chiếm tỷ lệ cao nhất"],["그 뒤를 이어 N이/가 ~%로 나타났다","tiếp theo là N với ~%"],
 ["-(으)로 조사되었다 / 나타났다","được khảo sát là / cho thấy là"],["반면에 N은/는","ngược lại N thì"],["이러한 변화의 원인으로는 N을/를 들 수 있다","nguyên nhân của sự thay đổi này có thể kể đến N"],
 ["-(으)ㄹ 것으로 예상된다 / 전망된다","được dự báo sẽ"],["이를 통해 -다는 것을 알 수 있다","qua đó có thể thấy rằng"]
];

const WRITE_54 = [
 {title:"인공지능의 발달과 인간의 일자리",prompt:"인공지능 기술이 빠르게 발전하면서 많은 일자리가 사라질 것이라는 우려와 새로운 일자리가 생겨날 것이라는 기대가 공존하고 있다. 이에 대해 아래의 내용을 중심으로 자신의 생각을 쓰라.",tasks:["인공지능의 발달이 일자리에 미치는 긍정적 영향은 무엇인가?","부정적 영향은 무엇인가?","이러한 변화에 대응하기 위해 어떤 노력이 필요한가?"],outline:{"서론":"AI 확산 현황 + 쟁점 제시 (우려와 기대의 공존)","본론":"① 긍정: 새로운 직업 창출, 위험·반복 업무 대체 ② 부정: 단순 사무·생산직 감소, 소득 격차 심화","결론":"재교육·평생 교육, 사회 안전망 확충, 개인의 역량 개발 → 공존 방안"}},
 {title:"저출산 문제의 원인과 해결 방안",prompt:"최근 출산율이 지속적으로 하락하면서 저출산이 심각한 사회 문제로 떠오르고 있다. 이에 대해 아래의 내용을 중심으로 자신의 생각을 쓰라.",tasks:["저출산의 원인은 무엇인가?","저출산이 사회에 미치는 영향은 무엇인가?","저출산 문제를 해결하기 위한 방안은 무엇인가?"],outline:{"서론":"출산율 하락 현황 → 사회적 쟁점화","본론":"① 원인: 주거비·교육비 부담, 일·가정 양립의 어려움, 가치관 변화 ② 영향: 생산 가능 인구 감소, 성장 둔화, 복지 재정 부담","결론":"주거·양육 지원, 유연 근무 확대, 인식 개선 → 정부·기업·개인의 공동 노력"}},
 {title:"소셜 미디어가 소통에 미치는 영향",prompt:"소셜 미디어의 보급으로 사람들의 소통 방식이 크게 달라졌다. 이에 대해 아래의 내용을 중심으로 자신의 생각을 쓰라.",tasks:["소셜 미디어가 소통에 미치는 긍정적 영향은 무엇인가?","부정적 영향은 무엇인가?","소셜 미디어를 바람직하게 이용하기 위한 방법은 무엇인가?"],outline:{"서론":"소셜 미디어 일상화 → 소통 방식의 변화","본론":"① 긍정: 시공간 제약 없는 소통, 다양한 의견 교류 ② 부정: 피상적 관계, 허위 정보·혐오 표현 확산, 확증 편향","결론":"비판적 수용 능력(미디어 리터러시), 대면 소통 병행, 플랫폼 책임 강화"}}
];

const ESSAY_BANK = [
 {g:"서론 (mở bài)",p:["최근 N이/가 사회적 쟁점으로 떠오르고 있다.","N에 대해서는 찬반 의견이 분분하다.","이 글에서는 N의 원인과 해결 방안에 대해 살펴보고자 한다.","현대 사회에서 N은/는 피할 수 없는 흐름이 되었다."]},
 {g:"본론 (thân bài)",p:["우선 / 첫째, -다는 점을 들 수 있다.","이는 -기 때문이다.","예를 들어 / 실제로 -(으)ㄴ 것으로 나타났다.","이와 더불어 / 뿐만 아니라 -기도 하다.","반면에 -다는 우려도 제기된다.","-(으)ㄹ 우려가 있다 / -(으)ㄹ 소지가 있다.","N에 기여하다 / N을/를 초래하다 / N(으)로 이어지다."]},
 {g:"결론 (kết bài)",p:["이상에서 살펴본 바와 같이 -다.","따라서 -아/어야 할 것이다.","-기 위해서는 정부와 개인 모두의 노력이 필요하다.","요컨대 N은/는 양날의 검이라 할 수 있다."]}
];

const CHECKLIST = [
 {g:"Nội dung & thực hiện yêu cầu (내용 및 과제 수행)",i:["Trả lời đủ cả 3 câu hỏi gợi ý của đề","Nội dung bám sát chủ đề, không lạc đề","Lập luận có lý do và ví dụ cụ thể"]},
 {g:"Bố cục (글의 전개 구조)",i:["Có đủ 서론 – 본론 – 결론, chia đoạn rõ ràng","Dùng từ nối, biểu hiện chuyển đoạn (우선, 또한, 반면, 따라서…)","Kết luận nhất quán với mở bài"]},
 {g:"Ngôn ngữ (언어 사용)",i:["Toàn bài dùng đuôi văn viết -다 / -ㄴ다 / -는다, không dùng -요","Dùng ngữ pháp, từ vựng cao cấp đa dạng, không lặp","Chính tả, giãn cách (띄어쓰기) chính xác","Độ dài 600–700 ký tự (tính cả dấu cách)"]}
];

/* Chuyển văn nói → văn viết: [văn nói, văn viết] */
const STYLE_PAIRS = [
 ["요즘 사람들이 환경 문제에 관심이 많아요.","최근 사람들은 환경 문제에 많은 관심을 보이고 있다."],
 ["스마트폰 때문에 대화가 줄어든 것 같아요.","스마트폰으로 인해 대화가 줄어든 것으로 보인다."],
 ["근데 이 방법은 돈이 너무 많이 들어요.","그러나 이 방법은 비용이 지나치게 많이 든다."],
 ["정부가 빨리 대책을 만들어야 돼요.","정부는 시급히 대책을 마련해야 한다."],
 ["왜냐하면 일자리가 없거든요.","왜냐하면 일자리가 부족하기 때문이다."],
 ["그래서 저는 이 의견에 찬성해요.","따라서 필자는 이 의견에 찬성한다."],
 ["이건 진짜 심각한 문제예요.","이는 매우 심각한 문제이다."],
 ["사람들이 이 제도를 잘 몰라요.","많은 사람들이 이 제도에 대해 잘 알지 못한다."]
];
const STYLE_RULES = [
 ["-아요/어요/해요","-다 / -ㄴ다 / -는다","먹어요 → 먹는다, 가요 → 간다, 많아요 → 많다"],
 ["-이에요/예요","-이다","문제예요 → 문제이다"],
 ["-거든요","-기 때문이다","없거든요 → 없기 때문이다"],
 ["-(으)ㄴ 것 같아요","-(으)ㄴ 것으로 보인다","줄어든 것 같아요 → 줄어든 것으로 보인다"],
 ["근데 / 그런데","그러나 / 하지만","Mở câu đối lập"],
 ["그래서","따라서 / 그러므로","Kết luận"],
 ["너무 / 진짜 / 엄청 / 되게","매우 / 상당히 / 지나치게","Trạng từ văn viết"],
 ["저는 / 제가","필자는 / 나는 (hoặc lược bỏ)","Ngôi người viết"],
 ["이거 / 그거 / 이건","이것 / 그것 / 이는","Đại từ đầy đủ"],
 ["돼요 / 해야 돼요","된다 / 해야 한다","Nghĩa vụ"]
];
/* Mẫu phát hiện văn nói trong bài viết */
const SPOKEN_MARKERS = ["요.","요,","요 ","근데","너무","진짜","엄청","되게","거든","이건","그건","저는","제가","같아요","그래서"];

/* 7. NGHE – NÓI: lines = [người nói, câu] ; q = câu hỏi hiểu */
const LISTEN = [
 {id:"l1",type:"Đối thoại thời sự (시사 대담)",title:"재택근무가 바꾼 일하는 방식",lines:[
  ["진행자","오늘은 재택근무의 확산이 우리 사회에 가져온 변화에 대해 노동경제학자 김수진 교수님과 이야기 나눠 보겠습니다. 교수님, 안녕하십니까?"],
  ["교수","네, 안녕하십니까?"],
  ["진행자","감염병 유행 이후 재택근무가 크게 늘었는데요, 지금은 어떤 상황입니까?"],
  ["교수","유행이 끝난 뒤 상당수 기업이 사무실 출근으로 복귀했습니다만, 주 2~3일은 집에서 일하는 혼합형 근무가 하나의 표준으로 자리 잡아 가고 있습니다."],
  ["진행자","혼합형 근무가 주목받는 이유는 무엇일까요?"],
  ["교수","직원 입장에서는 출퇴근 시간이 줄어 일과 삶의 균형을 맞추기가 쉬워지고, 기업 입장에서는 사무실 운영 비용을 절감할 수 있기 때문입니다."],
  ["진행자","그렇다면 부작용은 없습니까?"],
  ["교수","물론 있습니다. 대면 소통이 줄면서 신입 사원들이 업무를 배우거나 조직 문화에 적응하는 데 어려움을 겪는다는 지적이 많습니다. 또 일과 휴식의 경계가 모호해져 오히려 근무 시간이 길어지는 경우도 있고요."],
  ["진행자","앞으로 기업들은 어떤 점에 유의해야 할까요?"],
  ["교수","근무 형태보다 중요한 것은 성과를 공정하게 평가하는 체계입니다. 눈에 보이는 출근 여부가 아니라 실제 성과를 기준으로 평가해야 혼합형 근무가 제대로 정착할 수 있을 겁니다."],
  ["진행자","네, 말씀 감사합니다."]],
  q:[["교수의 중심 생각으로 가장 알맞은 것을 고르십시오.",["재택근무는 감염병이 끝나면 사라져야 한다.","혼합형 근무가 정착하려면 성과를 공정하게 평가하는 체계가 필요하다.","신입 사원은 반드시 사무실에서만 근무해야 한다.","사무실 운영 비용을 줄이는 것이 가장 중요하다."],1],
     ["들은 내용과 같은 것을 고르십시오.",["대부분의 기업이 완전한 재택근무를 유지하고 있다.","혼합형 근무는 근무 시간을 항상 줄여 준다.","대면 소통이 줄어 신입 사원이 적응에 어려움을 겪기도 한다.","교수는 출근 여부를 기준으로 평가해야 한다고 했다."],2]]},
 {id:"l2",type:"Bài giảng (강연)",title:"기후 위기 시대, 개인의 실천은 의미가 있는가",lines:[
  ["강연자","여러분, 안녕하십니까? 오늘은 기후 위기 시대에 개인의 실천이 과연 의미가 있는가에 대해 이야기해 보고자 합니다."],
  ["강연자","많은 분들이 기후 위기는 국가나 거대 기업이 해결해야 할 문제이지, 개인이 할 수 있는 일은 없다고 생각하십니다."],
  ["강연자","실제로 전 세계 온실가스 배출량의 상당 부분은 에너지와 산업 부문에서 발생합니다."],
  ["강연자","그러나 개인의 실천이 무의미하다고 단정하기는 이릅니다. 개인의 소비 선택이 모이면 시장의 방향을 바꿀 수 있기 때문입니다."],
  ["강연자","친환경 제품을 찾는 소비자가 늘어나자 기업들이 앞다투어 생산 방식을 바꾸고 있는 것이 그 예입니다."],
  ["강연자","또한 개인의 목소리는 정책을 움직이는 힘이 됩니다. 시민들의 요구가 커질수록 정부는 더 적극적인 기후 정책을 내놓을 수밖에 없습니다."],
  ["강연자","결국 개인의 실천과 제도의 변화는 서로 대립하는 것이 아니라 맞물려 돌아가는 톱니바퀴와 같습니다."],
  ["강연자","오늘 제 이야기가 여러분의 작은 실천을 다시 생각해 보는 계기가 되기를 바랍니다. 감사합니다."]],
  q:[["강연의 중심 내용으로 가장 알맞은 것을 고르십시오.",["기후 위기는 오직 국가만이 해결할 수 있다.","개인의 실천은 시장과 정책을 바꿀 수 있으므로 의미가 있다.","기업은 친환경 제품 생산을 줄여야 한다.","온실가스는 주로 가정에서 배출된다."],1],
     ["강연자의 말하기 방식으로 가장 알맞은 것을 고르십시오.",["통계 자료를 나열하며 결론을 유보하고 있다.","예상되는 반론을 인정한 뒤 이를 반박하고 있다.","개인적인 경험만을 근거로 주장하고 있다.","상대방의 의견에 전적으로 동의하고 있다."],1]]}
];

/* Kính ngữ & văn phong: [해체, 해요체, 합쇼체, 문어체 trang trọng] */
const REGISTERS = [
 {ctx:"Thông báo giờ họp",s:["회의 3시에 시작해.","회의는 3시에 시작해요.","회의는 3시에 시작합니다.","회의는 오후 3시에 개최된다."]},
 {ctx:"Nêu ý kiến",s:["이 문제는 다시 생각해 봐야 할 것 같아.","이 문제는 다시 생각해 봐야 할 것 같아요.","이 문제는 다시 검토해 볼 필요가 있다고 생각합니다.","이 문제는 재검토가 필요하다."]},
 {ctx:"Hỏi về cấp trên (kính ngữ chủ thể)",s:["사장님 지금 회의실에 계셔?","사장님께서 지금 회의실에 계세요?","사장님께서 지금 회의실에 계십니까?","대표이사는 현재 회의 중이다. (văn bản khách quan thường lược kính ngữ)"]},
 {ctx:"Đề nghị gửi tài liệu",s:["자료 좀 보내 줘.","자료 좀 보내 주세요.","자료를 보내 주시기 바랍니다.","관련 자료를 송부해 주시기 바랍니다."]},
 {ctx:"Xin lỗi vì chậm trễ",s:["늦어서 미안해.","늦어서 죄송해요.","늦어서 죄송합니다.","처리가 지연된 점 깊이 사과드립니다."]},
 {ctx:"Báo cáo kết quả",s:["이번 프로젝트 잘 끝났어.","이번 프로젝트는 잘 끝났어요.","이번 프로젝트는 성공적으로 마무리되었습니다.","본 프로젝트는 성공적으로 완료되었다."]},
 {ctx:"Kính ngữ từ vựng đặc biệt",s:["할머니 진지 드시고 주무셔.","할머니께서 진지를 드시고 주무세요.","할머니께서 진지를 드시고 주무십니다.","할머니께서는 식사를 마치신 후 주무신다."]}
];
const HONORIFIC_WORDS = [
 ["있다","계시다","ở, có mặt"],["먹다","드시다 / 잡수시다","ăn"],["자다","주무시다","ngủ"],["말하다","말씀하시다","nói"],
 ["아프다","편찮으시다","ốm, đau"],["죽다","돌아가시다","qua đời"],["주다","드리다 (khiêm nhường)","biếu, đưa"],["묻다","여쭙다 (khiêm nhường)","hỏi"],
 ["보다 (gặp)","뵙다 (khiêm nhường)","gặp"],["데리고 가다","모시고 가다","dẫn đi"],["집","댁","nhà"],["나이","연세","tuổi"],
 ["이름","성함","tên"],["밥","진지","cơm"],["생일","생신","sinh nhật"],["말","말씀","lời nói"]
];

/* 8. THI THỬ (rút gọn theo cấu trúc TOPIK II) — audio: đoạn đọc bằng TTS (nếu có) */
const MOCK = [
 {sec:"듣기",audio:[["남","이번 공모전 마감이 언제까지였죠?"],["여","원래 이번 주 금요일이었는데 신청자가 많아서 다음 주 수요일로 연장됐대요."],["남","아, 그럼 자료를 조금 더 보완할 수 있겠네요."]],q:"들은 내용과 같은 것을 고르십시오.",o:["공모전 신청이 이미 끝났다.","공모전 마감이 다음 주로 연장되었다.","남자는 자료를 모두 제출했다.","신청자가 적어서 마감이 연장되었다."],a:1},
 {sec:"듣기",audio:[["여","요즘 도서관에서 ‘책 꾸러미’ 서비스를 한다면서요?"],["남","네, 원하는 분야만 알려 주면 사서가 책을 골라서 집으로 보내 주는 서비스예요. 바빠서 도서관에 직접 오기 어려운 직장인들에게 반응이 좋대요."]],q:"남자의 말에 따르면 이 서비스는 어떤 것입니까?",o:["이용자가 직접 책을 골라 빌린다.","사서가 책을 골라 집으로 보내 준다.","직장인만 이용할 수 있다.","도서관에 직접 방문해야 한다."],a:1},
 {sec:"읽기 · 문법",q:"갑자기 거래처에서 연락이 (   ) 회의에 늦고 말았다.",o:["오는 바람에","오는 김에","오더라도","오고자"],a:0},
 {sec:"읽기 · 문법",q:"그는 실수를 인정하기(   ) 오히려 남 탓만 했다.",o:["는커녕","마련이고","위해","십상이고"],a:0},
 {sec:"읽기 · 문법",q:"밑줄 친 부분과 의미가 비슷한 것을 고르십시오.<br>이번 달에는 거의 매일 야근을 했으니 <u>회사에서 산 것이나 마찬가지이다</u>.",o:["회사에서 산 셈이다","회사에서 살 리가 없다","회사에서 살 법하다","회사에서 살기 마련이다"],a:0},
 {sec:"읽기 · 문법",q:"아무리 바빠도 기본적인 안전 수칙을 (   ) 사고는 언제든지 일어날 수 있다.",o:["지키지 않는 한","지킨 덕분에","지키는 반면","지킬 따름이며"],a:0},
 {sec:"읽기 · 기사 제목",q:"다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.<br><b>수출 호조에도 내수 ‘꽁꽁’… 체감 경기 여전히 싸늘</b>",o:["수출과 내수가 모두 좋아져 경기가 회복되었다.","수출은 좋지만 국내 소비가 위축되어 사람들이 느끼는 경기는 나쁘다.","날씨가 추워져 국내 소비가 늘었다.","수출이 줄어 체감 경기가 나빠졌다."],a:1},
 {sec:"읽기 · 기사 제목",q:"다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.<br><b>역대급 폭염에 전력 수요 ‘사상 최고’… 블랙아웃 우려 커져</b>",o:["폭염으로 전력 수요가 최고치를 기록해 대규모 정전 우려가 커졌다.","전력 공급이 늘어 폭염 피해가 줄었다.","정전이 발생해 전력 수요가 줄었다.","폭염이 끝나 전력 수요가 안정되었다."],a:0},
 {sec:"읽기 · 순서 배열",q:"다음을 순서대로 맞게 배열한 것을 고르십시오.<br>(가) 그 결과 많은 기업이 원격 근무를 일상적인 근무 형태로 받아들이게 되었다.<br>(나) 감염병 유행 초기, 기업들은 직원 보호를 위해 어쩔 수 없이 재택근무를 도입했다.<br>(다) 하지만 막상 시행해 보니 생산성이 크게 떨어지지 않는다는 사실이 확인되었다.<br>(라) 처음에는 업무 효율이 떨어질 것이라는 우려가 컸다.",o:["(나)-(라)-(다)-(가)","(나)-(다)-(라)-(가)","(라)-(나)-(가)-(다)","(라)-(다)-(나)-(가)"],a:0},
 {sec:"읽기 · 순서 배열",q:"다음을 순서대로 맞게 배열한 것을 고르십시오.<br>(가) 이처럼 꿀벌의 감소는 식량 안보와 직결되는 문제이다.<br>(나) 최근 세계 곳곳에서 꿀벌이 집단으로 사라지는 현상이 보고되고 있다.<br>(다) 꿀벌은 꽃가루를 옮겨 농작물이 열매를 맺게 하는 중요한 역할을 한다.<br>(라) 실제로 인류가 재배하는 주요 작물의 상당수가 꽃가루 매개 곤충에 의존한다.",o:["(나)-(라)-(다)-(가)","(나)-(다)-(라)-(가)","(다)-(나)-(가)-(라)","(다)-(라)-(나)-(가)"],a:1},
 {sec:"읽기 · 빈칸",q:"(   )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.<br>익숙한 길을 갈 때 우리는 주변 풍경을 거의 기억하지 못한다. 뇌가 반복되는 정보를 중요하지 않다고 판단해 (   ) 때문이다. 반면 처음 가는 길에서는 모든 것이 새로워 뇌가 많은 정보를 처리하게 되고, 그래서 같은 거리라도 더 길게 느껴진다.",o:["처리를 생략하기","더 오래 저장하기","감정과 연결하기","다른 사람과 공유하기"],a:0},
 {sec:"읽기 · 중심 생각",q:"다음 글의 중심 생각을 고르십시오.<br>많은 사람이 휴식을 아무것도 하지 않는 것이라고 생각한다. 그러나 진정한 휴식은 단순히 활동을 멈추는 것이 아니라 일상에서 소모된 에너지를 회복하는 것이다. 하루 종일 앉아서 일한 사람에게는 누워 있는 것보다 가벼운 산책이 더 나은 휴식이 될 수 있다.",o:["휴식은 아무것도 하지 않는 것이다.","산책은 누구에게나 최고의 휴식이다.","자신에게 맞는 방식으로 에너지를 회복하는 것이 진정한 휴식이다.","앉아서 일하는 것은 건강에 해롭다."],a:2},
 {sec:"읽기 · 필자의 태도",q:"필자의 태도로 가장 알맞은 것을 고르십시오.<br>정부가 발표한 청년 주거 지원책은 방향은 옳지만, 지원 대상이 지나치게 좁아 실효성에 의문이 든다. 소득 기준을 현실화하고 지원 규모를 확대하지 않는다면 생색내기에 그칠 공산이 크다.",o:["정책을 전폭적으로 지지하고 있다.","정책의 한계를 지적하며 보완을 요구하고 있다.","정책의 폐지를 주장하고 있다.","정책에 대해 중립을 지키고 있다."],a:1},
 {sec:"읽기 · 문장 넣기",q:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.<br><b>〈보기〉 그 인기의 비결은 무엇보다 다른 일을 하면서도 책을 읽을 수 있다는 편리함에 있다.</b><br>종이책 판매가 감소하는 가운데 오디오북 시장은 빠르게 성장하고 있다. ( ㉠ ) 오디오북은 출퇴근길이나 운동 중에도 ‘듣는 독서’를 가능하게 한다. ( ㉡ ) 특히 시각 장애인이나 노안으로 글을 읽기 어려운 사람들에게는 독서의 문턱을 낮추는 역할을 한다. ( ㉢ ) 그러나 듣기만으로는 내용을 깊이 이해하기 어렵다는 지적도 있다. ( ㉣ )",o:["㉠","㉡","㉢","㉣"],a:0},
 {sec:"어휘 · 관용 표현",q:"(   )에 들어갈 말로 가장 알맞은 것을 고르십시오.<br>그 사람은 (   ) 어디를 가든 아는 사람을 만난다.",o:["발이 넓어서","귀가 얇아서","입이 무거워서","손을 떼서"],a:0},
 {sec:"어휘 · 속담",q:"(   )에 들어갈 말로 가장 알맞은 것을 고르십시오.<br>사고가 난 후에야 대책을 세우는 것은 (   ).",o:["티끌 모아 태산이다","소 잃고 외양간 고치는 격이다","고진감래라 할 수 있다","일석이조의 효과가 있다"],a:1},
 {sec:"어휘 · 유의어",q:"밑줄 친 부분과 바꿔 쓸 수 있는 것을 고르십시오.<br>정부는 경기를 <u>살리기</u> 위해 금리를 인하했다.",o:["부양하기","위축시키기","둔화시키기","고갈시키기"],a:0},
 {sec:"쓰기 · 문체",q:"다음 문장을 문어체로 가장 바르게 바꾼 것을 고르십시오.<br>“근데 이건 너무 어려운 문제예요.”",o:["그러나 이는 매우 어려운 문제이다.","근데 이는 너무 어려운 문제이다.","그러나 이건 매우 어려운 문제예요.","그런데 이것은 너무 어렵습니다요."],a:0}
];
