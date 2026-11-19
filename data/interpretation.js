/* =====================================================================
   BÀI LUYỆN PHIÊN DỊCH
   kind      "daily" (hội thoại hằng ngày: radio, podcast, phỏng vấn) | "news" (bản tin)
   source    nguồn                         url   link gốc (không bắt buộc)
   youtube   mã video YouTube (11 ký tự sau "v=" trong link) — để "" nếu dùng giọng đọc máy
   segments  [{who, ko, vi, start, end}]   start / end = giây trên video (chỉ cần khi có youtube)
             Không có youtube: web đọc câu "ko" bằng giọng tiếng Hàn của thiết bị.
   notes, vocab, grammar: giống phần biên dịch — vocab và grammar là BẮT BUỘC.

   Ví dụ một bài dùng YouTube:
   {id:"i9",kind:"news",source:"KBS News",url:"https://www.youtube.com/watch?v=XXXXXXXXXXX",
    youtube:"XXXXXXXXXXX",date:"2026-11-20",title:"…",
    segments:[{who:"앵커",ko:"…",vi:"…",start:3.5,end:11.2}, …], vocab:[…], grammar:[…]}
   Web chỉ nhúng video từ YouTube và lưu transcript do bạn soạn, không lưu file âm thanh.
   ===================================================================== */
const INTERPRETS = [
 {
  id:"i1", kind:"daily", source:"Hội thoại mô phỏng chương trình radio đọc thư thính giả", url:"", youtube:"", date:"2026-11-19",
  title:"Nhà gần công ty — tưởng sướng hóa khổ", level:"TOPIK 4–6",
  segments:[
   {who:"DJ",ko:"네, 다음 사연 소개해 드릴게요. 직장인 지민 씨가 보내 주셨는데요.",vi:"Vâng, tiếp theo mình xin giới thiệu một câu chuyện nữa. Đây là thư của bạn Ji-min, một nhân viên văn phòng."},
   {who:"DJ",ko:"요즘 회사 근처로 이사를 했더니 출근 시간이 확 줄었대요. 근데 문제는 퇴근하고 나서도 자꾸 회사에 불려 간다는 거예요.",vi:"Bạn ấy kể dạo này chuyển nhà đến gần công ty nên thời gian đi làm giảm hẳn. Nhưng vấn đề là tan làm rồi mà vẫn cứ bị gọi lên công ty."},
   {who:"청취자",ko:"안녕하세요! 와, 제 사연 읽어 주셔서 진짜 감사해요.",vi:"Xin chào ạ! Ôi, cảm ơn anh rất nhiều vì đã đọc thư của em."},
   {who:"DJ",ko:"지민 씨, 그럼 요즘은 좀 어떠세요? 아직도 야근 많이 하세요?",vi:"Ji-min này, thế dạo này thế nào rồi? Vẫn phải làm thêm giờ nhiều à?"},
   {who:"청취자",ko:"네, 솔직히 가까워서 좋은 줄 알았는데 오히려 일이 더 늘었어요. 팀장님이 “집 가깝잖아, 잠깐만 들렀다 가” 이러시거든요.",vi:"Vâng, thật ra em cứ tưởng ở gần là sướng, ai ngờ việc lại càng nhiều hơn. Vì trưởng nhóm cứ bảo “Nhà gần mà, ghé qua một lát rồi về”."},
   {who:"DJ",ko:"아이고, 그거 완전 함정이네요. 그래도 상사 부탁을 거절하기가 쉽지 않죠.",vi:"Trời ơi, đúng là cái bẫy luôn. Nhưng mà từ chối lời nhờ của sếp đâu có dễ, nhỉ."},
   {who:"청취자",ko:"맞아요. 그래서 이번 주부터는 퇴근하면 휴대폰을 무음으로 해 놓기로 했어요.",vi:"Đúng vậy ạ. Nên từ tuần này em quyết định tan làm là để điện thoại ở chế độ im lặng."},
   {who:"DJ",ko:"좋은 방법이네요! 지민 씨 응원하는 의미로 신청곡 바로 들려 드릴게요.",vi:"Cách hay đấy! Để cổ vũ Ji-min, mình sẽ phát ngay bài hát bạn ấy yêu cầu."}
  ],
  notes:[
   "-대요 = người nói đang thuật lại lời người khác → dịch “bạn ấy kể / nghe nói”, đừng dịch như lời của chính DJ.",
   "Giọng radio thân mật: dùng “mình”, “bạn ấy”, “nhỉ”, “đấy” để giữ sắc thái; thính giả nói với DJ dùng “em – anh/chị”.",
   "Hội thoại mô phỏng, phát bằng giọng đọc máy."
  ],
  vocab:[
   {ko:"사연",rom:"sa-yeon",hv:"sự duyên",vi:"câu chuyện, tâm sự (thư gửi chương trình)",en:"story, letter (to a show)",str:["사연을 보내다","사연을 소개하다","사연이 있다"],syn:"이야기",ant:"",ex:["라디오에 보낸 사연이 방송에 소개되었다.","Câu chuyện tôi gửi đến radio đã được đọc trên sóng.","The story I sent to the radio was read on air."]},
   {ko:"불려 가다",rom:"bul-lyeo ga-da",hv:"",vi:"bị gọi đến (nơi nào đó)",en:"to be called in",str:["회사에 불려 가다","교무실에 불려 가다"],syn:"호출되다",ant:"",ex:["실수 때문에 사장실에 불려 갔다.","Vì sơ suất mà tôi bị gọi lên phòng giám đốc.","I was called into the boss's office over a mistake."]},
   {ko:"야근",rom:"ya-geun",hv:"dạ cần",vi:"làm thêm giờ buổi tối",en:"working late, overtime",str:["야근하다","야근 수당"],syn:"초과 근무",ant:"칼퇴근 (tan làm đúng giờ)",ex:["마감이 다가와서 이번 주 내내 야근했다.","Sắp đến hạn nên cả tuần nay tôi phải làm thêm buổi tối.","With the deadline near, I worked late all week."]},
   {ko:"들르다",rom:"deul-reu-da",hv:"",vi:"ghé qua",en:"to drop by",str:["잠깐 들르다","편의점에 들르다"],syn:"방문하다",ant:"",ex:["퇴근길에 마트에 잠깐 들렀다.","Trên đường đi làm về tôi ghé siêu thị một lát.","I stopped by the supermarket on my way home."]},
   {ko:"함정",rom:"ham-jeong",hv:"hãm tịnh",vi:"cái bẫy",en:"trap",str:["함정에 빠지다","함정이 있다"],syn:"덫",ant:"",ex:["싼 가격에는 함정이 있을 수 있다.","Giá rẻ có thể ẩn chứa cái bẫy.","A low price may hide a catch."]},
   {ko:"거절하다",rom:"geo-jeol-ha-da",hv:"cự tuyệt",vi:"từ chối",en:"to refuse",str:["부탁을 거절하다","정중하게 거절하다"],syn:"사양하다",ant:"수락하다, 받아들이다",ex:["그는 제안을 정중하게 거절했다.","Anh ấy lịch sự từ chối lời đề nghị.","He politely declined the offer."]},
   {ko:"무음",rom:"mu-eum",hv:"vô âm",vi:"chế độ im lặng",en:"silent mode",str:["무음으로 하다","무음 모드"],syn:"",ant:"벨소리",ex:["회의 중에는 휴대폰을 무음으로 해 주세요.","Trong cuộc họp, vui lòng để điện thoại ở chế độ im lặng.","Please set your phone to silent during the meeting."]},
   {ko:"신청곡",rom:"sin-cheong-gok",hv:"thân thỉnh khúc",vi:"bài hát yêu cầu",en:"song request",str:["신청곡을 틀다","신청곡을 보내다"],syn:"",ant:"",ex:["청취자의 신청곡으로 오늘 방송을 마치겠습니다.","Chúng tôi xin khép lại chương trình hôm nay bằng bài hát thính giả yêu cầu.","We'll close today's show with a listener's request."]}
  ],
  grammar:[
   {f:"-대요",m:"(người ta) nói rằng — thuật lại lời người khác",ex:"출근 시간이 확 줄었대요.",vi:"Bạn ấy kể thời gian đi làm giảm hẳn.",ref:"g15"},
   {f:"-았/었더니",m:"(đã làm…) thì kết quả là…",ex:"회사 근처로 이사를 했더니 출근 시간이 확 줄었대요.",vi:"chuyển đến gần công ty nên thời gian đi làm giảm hẳn",ref:"g17"},
   {f:"-(으)ㄴ/는 줄 알았는데",m:"cứ tưởng là… (hóa ra không phải)",ex:"가까워서 좋은 줄 알았는데 오히려 일이 더 늘었어요.",vi:"cứ tưởng ở gần là sướng, ai ngờ việc lại nhiều hơn"},
   {f:"-잖아(요)",m:"…mà (nhắc điều người nghe đã biết)",ex:"집 가깝잖아.",vi:"Nhà gần mà."},
   {f:"-거든요",m:"vì… (giải thích lý do, văn nói)",ex:"팀장님이 … 이러시거든요.",vi:"Vì trưởng nhóm cứ bảo…"},
   {f:"-기로 하다",m:"quyết định (làm gì)",ex:"휴대폰을 무음으로 해 놓기로 했어요.",vi:"em quyết định để điện thoại ở chế độ im lặng"}
  ]
 },
 {
  id:"i2", kind:"news", source:"Bản tin mô phỏng văn phong thời sự truyền hình", url:"", youtube:"", date:"2026-11-19",
  title:"Cảnh báo rét đậm — Seoul xuống âm 10 độ", level:"TOPIK 5–6",
  segments:[
   {who:"앵커",ko:"올겨울 첫 한파 특보가 내려진 가운데, 내일 아침 서울의 기온이 영하 10도까지 떨어질 전망입니다. 김민수 기자가 보도합니다.",vi:"Trong bối cảnh cảnh báo rét đậm đầu tiên của mùa đông năm nay được ban bố, nhiệt độ sáng mai ở Seoul dự báo sẽ giảm xuống âm 10 độ. Phóng viên Kim Min-su đưa tin."},
   {who:"기자",ko:"기상청은 오늘 밤 9시를 기해 서울과 경기 북부, 강원 내륙에 한파 경보를 발령했습니다.",vi:"Cơ quan Khí tượng đã ban bố cảnh báo rét đậm cho Seoul, bắc Gyeonggi và vùng nội địa Gangwon, có hiệu lực từ 9 giờ tối nay."},
   {who:"기자",ko:"내일 아침 최저 기온은 서울 영하 10도, 철원 영하 17도 등 전국 대부분 지역이 영하권에 머물겠고, 바람까지 강하게 불어 체감 온도는 이보다 5도가량 더 낮겠습니다.",vi:"Nhiệt độ thấp nhất sáng mai ở Seoul là âm 10 độ, Cheorwon âm 17 độ; hầu hết các địa phương trên cả nước ở dưới 0 độ. Gió còn thổi mạnh nên nhiệt độ cảm nhận sẽ thấp hơn khoảng 5 độ."},
   {who:"기자",ko:"이번 추위는 주말까지 이어지다가 다음 주 초 평년 기온을 회복할 것으로 보입니다.",vi:"Đợt rét này sẽ kéo dài đến cuối tuần, sau đó nhiệt độ dự kiến trở lại mức trung bình nhiều năm vào đầu tuần sau."},
   {who:"기자",ko:"기상청은 수도관 동파와 빙판길 사고에 대비하고, 노약자는 외출을 자제해 달라고 당부했습니다. 김민수입니다.",vi:"Cơ quan Khí tượng khuyến cáo người dân đề phòng vỡ ống nước do đóng băng và tai nạn trên đường trơn băng; người già, trẻ nhỏ và người yếu nên hạn chế ra ngoài. Kim Min-su đưa tin."}
  ],
  notes:[
   "영하 10도 = âm 10 độ; 영하권 = “dưới 0 độ”. Phiên dịch nhiệt độ cần nói rõ dấu âm.",
   "평년 기온 = nhiệt độ trung bình nhiều năm (không phải “nhiệt độ bình thường trong năm”).",
   "Câu chào cuối bản tin (김민수입니다) → “Kim Min-su đưa tin” / “Phóng viên Kim Min-su, …”.",
   "Bản tin mô phỏng, phát bằng giọng đọc máy; số liệu không phải tin thật."
  ],
  vocab:[
   {ko:"한파 특보",rom:"han-pa teuk-bo",hv:"hàn ba đặc báo",vi:"bản tin cảnh báo rét đậm",en:"cold wave alert",str:["한파 특보가 내려지다","한파 특보를 발효하다"],syn:"한파 주의보 / 한파 경보",ant:"폭염 특보",ex:["중부 지방에 한파 특보가 내려졌다.","Cảnh báo rét đậm đã được ban bố cho khu vực miền Trung.","A cold wave alert was issued for the central region."]},
   {ko:"발령하다",rom:"bal-ryeong-ha-da",hv:"phát lệnh",vi:"ban bố (cảnh báo); bổ nhiệm",en:"to issue (an alert)",str:["경보를 발령하다","인사 발령"],syn:"발효하다",ant:"해제하다",ex:["당국은 미세먼지 경보를 발령했다.","Nhà chức trách đã ban bố cảnh báo bụi mịn.","Authorities issued a fine-dust warning."]},
   {ko:"영하권",rom:"yeong-ha-gwon",hv:"linh hạ quyển",vi:"mức dưới 0 độ",en:"sub-zero range",str:["영하권에 머물다","영하권으로 떨어지다"],syn:"",ant:"영상권",ex:["아침 기온이 영하권으로 떨어지겠습니다.","Nhiệt độ buổi sáng sẽ xuống dưới 0 độ.","Morning temperatures will drop below zero."]},
   {ko:"체감 온도",rom:"che-gam on-do",hv:"thể cảm ôn độ",vi:"nhiệt độ cảm nhận",en:"wind chill, feels-like temperature",str:["체감 온도가 낮다","체감 온도가 영하 15도에 이르다"],syn:"",ant:"",ex:["바람이 불어 체감 온도는 영하 15도에 이르렀다.","Gió thổi khiến nhiệt độ cảm nhận xuống tới âm 15 độ.","The wind made it feel like minus 15 degrees."]},
   {ko:"평년",rom:"pyeong-nyeon",hv:"bình niên",vi:"mức trung bình nhiều năm",en:"normal year, climatological average",str:["평년 기온","평년보다 높다"],syn:"예년",ant:"",ex:["올여름 기온은 평년보다 2도 높았다.","Nhiệt độ mùa hè năm nay cao hơn trung bình nhiều năm 2 độ.","This summer was 2 degrees warmer than average."]},
   {ko:"동파",rom:"dong-pa",hv:"đông phá",vi:"vỡ (ống nước, đồng hồ nước) do đóng băng",en:"freeze-burst",str:["수도관 동파","동파를 예방하다"],syn:"",ant:"",ex:["한파로 수도 계량기 동파 신고가 잇따랐다.","Do rét đậm, các báo cáo vỡ đồng hồ nước do đóng băng liên tiếp được ghi nhận.","Reports of frozen, burst water meters poured in during the cold snap."]},
   {ko:"빙판길",rom:"bing-pan-gil",hv:"băng bản (+ 길: đường)",vi:"đường đóng băng, trơn trượt",en:"icy road",str:["빙판길 사고","빙판길에 미끄러지다"],syn:"",ant:"",ex:["빙판길에서는 속도를 줄이고 안전거리를 확보해야 한다.","Trên đường đóng băng phải giảm tốc độ và giữ khoảng cách an toàn.","On icy roads, slow down and keep a safe distance."]},
   {ko:"자제하다",rom:"ja-je-ha-da",hv:"tự chế",vi:"hạn chế, kiềm chế (không làm)",en:"to refrain from",str:["외출을 자제하다","발언을 자제하다"],syn:"삼가다",ant:"",ex:["미세먼지가 심한 날에는 야외 활동을 자제하는 것이 좋다.","Những ngày bụi mịn nặng nên hạn chế hoạt động ngoài trời.","On high fine-dust days, it's best to avoid outdoor activities."]}
  ],
  grammar:[
   {f:"-는 가운데",m:"trong bối cảnh…",ex:"올겨울 첫 한파 특보가 내려진 가운데…",vi:"Trong bối cảnh cảnh báo rét đậm đầu tiên được ban bố…",ref:"g27"},
   {f:"-(으)ㄹ 전망입니다",m:"dự báo sẽ…",ex:"영하 10도까지 떨어질 전망입니다.",vi:"dự báo sẽ giảm xuống âm 10 độ."},
   {f:"N을/를 기해",m:"kể từ (thời điểm) — văn hành chính",ex:"오늘 밤 9시를 기해…",vi:"có hiệu lực từ 9 giờ tối nay"},
   {f:"-겠습니다 (dự báo)",m:"sẽ… (dự báo thời tiết)",ex:"영하권에 머물겠고 … 더 낮겠습니다.",vi:"sẽ ở dưới 0 độ … sẽ thấp hơn"},
   {f:"-다가",m:"(đang)… rồi chuyển sang…",ex:"주말까지 이어지다가 다음 주 초 평년 기온을 회복할 것으로 보입니다.",vi:"kéo dài đến cuối tuần rồi trở lại mức trung bình"},
   {f:"-아/어 달라고 당부했다",m:"khuyến cáo (ai đó) hãy…",ex:"노약자는 외출을 자제해 달라고 당부했습니다.",vi:"khuyến cáo người già, trẻ nhỏ hạn chế ra ngoài"}
  ]
 }
];
