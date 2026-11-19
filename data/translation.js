/* =====================================================================
   BÀI LUYỆN BIÊN DỊCH
   Mỗi bài là một đối tượng { … } trong mảng TRANSLATIONS. Thêm bài mới:
   chép một khối mẫu, đổi id (không trùng), điền nội dung, đặt dấu phẩy giữa các bài.

   id        mã bài, không trùng                 kind     "news" | "policy" | "own"
   source    nguồn (đài, chuyên mục)             url      link bài gốc (có thể để "")
   date      ngày nhập "YYYY-MM-DD"              topic    chủ đề      level   cấp độ
   title     tiêu đề hiển thị
   headline  {ko, hint, vi}  tiêu đề báo để luyện giải mã (không bắt buộc)
   segments  [{ko, vi}]      câu / đoạn gốc + bản dịch mẫu
   notes     ["…"]           ghi chú kỹ thuật dịch
   vocab     [{ko, rom, hv, vi, en, str:[…], syn, ant, ex:[Hàn, Việt, Anh]}]   ← BẮT BUỘC
   grammar   [{f, m, ex, vi, ref}]   ref = mã mẫu trong phần Ngữ pháp (g1…g30), không bắt buộc ← BẮT BUỘC

   BẢN QUYỀN: web trên GitHub Pages là công khai. Với bài của YTN, KBS, SBS, MBC, 연합뉴스…
   chỉ để link + trích đoạn ngắn; toàn văn hãy dán bằng nút “Dán bài báo của tôi” (chỉ lưu
   trong trình duyệt). Bài mang nhãn 공공누리 loại 1 (korea.kr, korea.net…) được đăng lại kèm nguồn.
   ===================================================================== */
const TRANSLATIONS = [
 {
  id:"t1", kind:"news", source:"Bài luyện mô phỏng văn phong bản tin kinh tế", url:"", date:"2026-11-19",
  topic:"Kinh tế", level:"TOPIK 5–6", title:"Lạm phát chững lại nhưng giá cả cảm nhận vẫn cao",
  headline:{ko:"물가 오름세 꺾였지만… 체감 물가는 ‘여전히 고공행진’",hint:"오름세 = đà tăng; 꺾이다 = bị bẻ gãy → chững lại; ‘…’ là cách nói hình ảnh",vi:"Đà tăng giá đã chững lại, nhưng giá cả người dân cảm nhận vẫn “phi mã”"},
  segments:[
   {ko:"지난달 소비자물가 상승률이 2%대 초반으로 내려앉으며 석 달 연속 둔화세를 이어 갔다.",vi:"Tỷ lệ tăng giá tiêu dùng tháng trước đã hạ xuống mức đầu 2%, nối dài đà chậm lại sang tháng thứ ba liên tiếp."},
   {ko:"통계 당국은 국제 유가가 안정세를 보인 데다 농산물 가격도 하락하면서 전체 물가 상승 폭이 줄었다고 밝혔다.",vi:"Cơ quan thống kê cho biết giá dầu quốc tế ổn định, cộng thêm giá nông sản giảm, nên mức tăng giá chung đã thu hẹp."},
   {ko:"그러나 외식비와 가공식품 등 생활과 밀접한 품목의 가격은 여전히 높은 수준을 유지하고 있어 서민들이 느끼는 체감 물가는 좀처럼 내려가지 않고 있다.",vi:"Tuy nhiên, giá các mặt hàng gắn liền với đời sống như ăn uống bên ngoài và thực phẩm chế biến vẫn ở mức cao, nên mức giá mà người dân cảm nhận vẫn chưa hạ nhiệt."},
   {ko:"전문가들은 고금리 기조가 이어지는 가운데 내수 회복이 더딘 만큼 물가 안정과 경기 부양 사이에서 정교한 정책 조합이 필요하다고 지적했다.",vi:"Các chuyên gia chỉ ra rằng trong bối cảnh lãi suất cao kéo dài và tiêu dùng nội địa phục hồi chậm, cần có sự phối hợp chính sách khéo léo giữa bình ổn giá và kích thích kinh tế."},
   {ko:"정부는 다음 주 물가 관계 장관 회의를 열고 농축수산물 할인 지원 등 추가 대책을 논의할 예정이다.",vi:"Tuần tới, Chính phủ dự kiến họp các bộ trưởng liên quan đến giá cả để thảo luận các biện pháp bổ sung như hỗ trợ giảm giá nông, súc, thủy sản."}
  ],
  notes:[
   "Tiêu đề: dấu “…” báo hiệu vế đối lập (đã giảm… nhưng…); từ trong ngoặc ‘ ’ là cách nói hình ảnh → dịch theo nghĩa, không dịch từng chữ.",
   "2%대 초반 = “mức đầu 2%” (khoảng 2,0–2,3%). 석 달 = “ba tháng” (số đếm thuần Hàn đi với 달).",
   "Câu 4 rất dài: tiếng Việt báo chí có thể tách làm hai câu, miễn giữ đủ quan hệ nguyên nhân – kết luận.",
   "Bài luyện mô phỏng: số liệu không phải tin thật."
  ],
  vocab:[
   {ko:"상승률",rom:"sang-seung-nyul",hv:"thượng thăng suất",vi:"tỷ lệ tăng",en:"rate of increase",str:["물가 상승률","상승률이 둔화되다"],syn:"증가율",ant:"하락률",ex:["올해 임금 상승률은 물가 상승률에 미치지 못했다.","Tỷ lệ tăng lương năm nay không theo kịp tỷ lệ tăng giá.","This year's wage growth fell short of inflation."]},
   {ko:"둔화세",rom:"dun-hwa-se",hv:"độn hóa thế",vi:"đà chậm lại",en:"slowing trend",str:["둔화세를 보이다","둔화세가 이어지다"],syn:"감속세",ant:"가속화",ex:["수출 증가율이 둔화세를 보이고 있다.","Tốc độ tăng xuất khẩu đang có dấu hiệu chậm lại.","Export growth is showing signs of slowing."]},
   {ko:"체감 물가",rom:"che-gam mul-ga",hv:"thể cảm vật giá",vi:"giá cả người dân cảm nhận thực tế",en:"perceived prices",str:["체감 물가가 높다","체감 물가를 낮추다"],syn:"",ant:"지표 물가 (giá theo chỉ số)",ex:["지표상 물가는 안정됐지만 체감 물가는 여전히 높다.","Giá theo chỉ số đã ổn định nhưng giá người dân cảm nhận vẫn cao.","Official inflation has stabilized, but perceived prices remain high."]},
   {ko:"고공행진",rom:"go-gong-haeng-jin",hv:"cao không hành tiến",vi:"tăng cao liên tục, “phi mã”",en:"soaring",str:["고공행진을 이어 가다","고공행진을 벌이다"],syn:"고공비행",ant:"하락세",ex:["채솟값이 몇 달째 고공행진을 이어 가고 있다.","Giá rau đã tăng cao liên tục mấy tháng nay.","Vegetable prices have been soaring for months."]},
   {ko:"기조",rom:"gi-jo",hv:"cơ điệu",vi:"đường lối, xu hướng (chính sách)",en:"stance, keynote",str:["고금리 기조","긴축 기조를 유지하다"],syn:"방침, 노선",ant:"",ex:["중앙은행은 당분간 긴축 기조를 유지할 방침이다.","Ngân hàng trung ương dự kiến duy trì đường lối thắt chặt trong thời gian tới.","The central bank plans to keep its tightening stance for now."]},
   {ko:"내수",rom:"nae-su",hv:"nội nhu",vi:"nhu cầu (tiêu dùng) nội địa",en:"domestic demand",str:["내수 부진","내수를 살리다"],syn:"국내 수요",ant:"수출",ex:["내수 부진이 장기화되면서 자영업자들의 어려움이 커지고 있다.","Tiêu dùng nội địa trì trệ kéo dài khiến khó khăn của hộ kinh doanh ngày càng lớn.","Prolonged weak domestic demand is deepening the hardship of the self-employed."]},
   {ko:"서민",rom:"seo-min",hv:"thứ dân",vi:"người dân bình thường, người lao động thu nhập thấp",en:"ordinary people",str:["서민 경제","서민 부담을 덜다"],syn:"일반 국민",ant:"부유층",ex:["정부는 서민 부담을 덜기 위해 공공요금을 동결했다.","Chính phủ đóng băng giá dịch vụ công để giảm gánh nặng cho người dân.","The government froze utility rates to ease the burden on ordinary people."]},
   {ko:"농축수산물",rom:"nong-chuk-su-san-mul",hv:"nông súc thủy sản vật",vi:"nông, súc, thủy sản",en:"farm, livestock and fishery products",str:["농축수산물 할인","농축수산물 가격"],syn:"",ant:"공산품",ex:["명절을 앞두고 농축수산물 할인 행사가 열린다.","Trước dịp lễ sẽ có chương trình giảm giá nông, súc, thủy sản.","A discount event on farm, livestock and fishery products will be held ahead of the holiday."]}
  ],
  grammar:[
   {f:"-(으)며",m:"và, đồng thời (nối hai vế trong văn tin tức)",ex:"…2%대 초반으로 내려앉으며 석 달 연속 둔화세를 이어 갔다.",vi:"…hạ xuống mức đầu 2%, nối dài đà chậm lại…"},
   {f:"-(으)ㄴ 데다(가)",m:"đã… lại còn…",ex:"국제 유가가 안정세를 보인 데다 농산물 가격도 하락하면서…",vi:"giá dầu ổn định, cộng thêm giá nông sản giảm…",ref:"g21"},
   {f:"-다고 밝혔다 / -다고 지적했다",m:"cho biết / chỉ ra rằng (dẫn lời gián tiếp)",ex:"…전체 물가 상승 폭이 줄었다고 밝혔다.",vi:"…cho biết mức tăng giá chung đã thu hẹp."},
   {f:"-는 가운데",m:"trong bối cảnh…",ex:"고금리 기조가 이어지는 가운데…",vi:"Trong bối cảnh lãi suất cao kéo dài…",ref:"g27"},
   {f:"-(으)ㄴ/는 만큼",m:"vì… nên (căn cứ cho đề xuất)",ex:"내수 회복이 더딘 만큼 … 정책 조합이 필요하다",vi:"vì tiêu dùng phục hồi chậm nên cần…",ref:"g26"},
   {f:"-(으)ㄹ 예정이다",m:"dự kiến sẽ",ex:"추가 대책을 논의할 예정이다.",vi:"dự kiến thảo luận các biện pháp bổ sung."}
  ]
 },
 {
  id:"t2", kind:"news", source:"Bài luyện mô phỏng văn phong bản tin pháp luật", url:"", date:"2026-11-19",
  topic:"Pháp luật – an ninh", level:"TOPIK 5–6", title:"Triệt phá đường dây lừa đảo qua điện thoại",
  headline:{ko:"경찰, 보이스피싱 조직 총책 등 30명 검거… 피해액 50억 원",hint:"Tiêu đề lược động từ; dấu phẩy sau chủ ngữ; 등 = “cùng, trong đó có”",vi:"Cảnh sát bắt 30 đối tượng, trong đó có kẻ cầm đầu đường dây lừa đảo qua điện thoại; thiệt hại 5 tỷ won"},
  segments:[
   {ko:"해외에 콜센터를 차려 놓고 수사 기관을 사칭해 돈을 가로챈 보이스피싱 조직이 경찰에 무더기로 붙잡혔다.",vi:"Một đường dây lừa đảo qua điện thoại lập tổng đài ở nước ngoài, mạo danh cơ quan điều tra để chiếm đoạt tiền đã bị cảnh sát bắt giữ hàng loạt."},
   {ko:"서울경찰청은 사기 등의 혐의로 총책 A씨 등 30명을 검거하고 이 가운데 12명을 구속했다고 오늘 밝혔다.",vi:"Hôm nay, Sở Cảnh sát Seoul cho biết đã bắt giữ 30 đối tượng, trong đó có kẻ cầm đầu A, về tội lừa đảo và các tội danh khác, đồng thời tạm giam 12 người trong số này."},
   {ko:"이들은 검사나 금융감독원 직원을 사칭해 “계좌가 범죄에 연루됐다”며 피해자 200여 명으로부터 약 50억 원을 송금받은 혐의를 받고 있다.",vi:"Các đối tượng bị cáo buộc mạo danh công tố viên hoặc nhân viên Cơ quan Giám sát Tài chính, nói rằng “tài khoản có liên quan đến tội phạm”, khiến hơn 200 nạn nhân chuyển cho chúng khoảng 5 tỷ won."},
   {ko:"경찰은 범행에 쓰인 대포통장과 휴대전화 수백 대를 압수하는 한편, 해외에 머무르고 있는 공범들을 추적하고 있다.",vi:"Cảnh sát đã thu giữ các tài khoản đứng tên người khác và hàng trăm điện thoại di động dùng để gây án, đồng thời đang truy lùng các đồng phạm còn ở nước ngoài."},
   {ko:"경찰 관계자는 “수사 기관은 절대 전화로 송금이나 개인 정보를 요구하지 않는다”며 각별한 주의를 당부했다.",vi:"Một đại diện cảnh sát khuyến cáo người dân đặc biệt cảnh giác: “Cơ quan điều tra tuyệt đối không yêu cầu chuyển tiền hay cung cấp thông tin cá nhân qua điện thoại.”"}
  ],
  notes:[
   "A씨: báo Hàn giấu tên nghi phạm bằng chữ cái + 씨 → dịch “đối tượng A”.",
   "검거 (bắt giữ nói chung) ≠ 구속 (tạm giam theo lệnh của tòa) ≠ 체포 (bắt theo thủ tục tố tụng). 압수 (thu giữ trong điều tra) ≠ 몰수 (tịch thu sung công theo bản án).",
   "50억 원 = 5 tỷ won (1억 = 100 triệu). Đây là bẫy số liệu hay gặp nhất khi dịch tin Hàn.",
   "Bài luyện mô phỏng: không phải tin thật."
  ],
  vocab:[
   {ko:"사칭하다",rom:"sa-ching-ha-da",hv:"trá xưng",vi:"mạo danh, mạo xưng",en:"to impersonate",str:["검사를 사칭하다","사칭 사기"],syn:"가장하다",ant:"",ex:["공무원을 사칭한 전화 사기가 기승을 부리고 있다.","Lừa đảo qua điện thoại mạo danh công chức đang hoành hành.","Phone scams impersonating officials are rampant."]},
   {ko:"검거하다",rom:"geom-geo-ha-da",hv:"kiểm cử",vi:"bắt giữ (nghi phạm)",en:"to apprehend",str:["용의자를 검거하다","일당을 검거하다"],syn:"체포하다, 붙잡다",ant:"놓치다",ex:["경찰은 사건 발생 사흘 만에 용의자를 검거했다.","Cảnh sát bắt được nghi phạm chỉ ba ngày sau khi vụ việc xảy ra.","Police caught the suspect just three days after the incident."]},
   {ko:"구속하다",rom:"gu-sok-ha-da",hv:"câu thúc",vi:"tạm giam (theo lệnh của tòa)",en:"to detain under a warrant",str:["구속 영장을 발부하다","구속 기소"],syn:"",ant:"석방하다, 불구속",ex:["법원은 증거 인멸 우려가 있다며 피의자를 구속했다.","Tòa án ra lệnh tạm giam nghi phạm vì lo ngại tiêu hủy chứng cứ.","The court detained the suspect, citing a risk of evidence tampering."]},
   {ko:"혐의",rom:"hyeom-ui",hv:"hiềm nghi",vi:"tội danh bị cáo buộc, nghi vấn phạm tội",en:"charge, suspicion",str:["-(으)ㄴ 혐의를 받다","혐의를 부인하다","사기 혐의로"],syn:"",ant:"무혐의",ex:["그는 모든 혐의를 부인했다.","Anh ta phủ nhận mọi cáo buộc.","He denied all the charges."]},
   {ko:"총책",rom:"chong-chaek",hv:"tổng trách",vi:"kẻ cầm đầu (đường dây)",en:"ringleader",str:["조직 총책","총책을 검거하다"],syn:"우두머리, 주범",ant:"하부 조직원",ex:["경찰은 해외로 도피한 총책의 행방을 쫓고 있다.","Cảnh sát đang truy tìm tung tích kẻ cầm đầu đã trốn ra nước ngoài.","Police are tracking the ringleader who fled abroad."]},
   {ko:"대포통장",rom:"dae-po-tong-jang",hv:"",vi:"tài khoản ngân hàng đứng tên người khác (dùng để phạm tội)",en:"burner bank account",str:["대포통장을 유통하다","대포통장 명의자"],syn:"차명 계좌",ant:"",ex:["대포통장을 빌려준 사람도 처벌을 받을 수 있다.","Người cho mượn tài khoản cũng có thể bị xử lý hình sự.","Those who lend their accounts can also be punished."]},
   {ko:"압수하다",rom:"ap-su-ha-da",hv:"áp thu",vi:"thu giữ (tang vật, chứng cứ)",en:"to seize",str:["증거물을 압수하다","압수 수색"],syn:"",ant:"반환하다",ex:["수사팀은 사무실을 압수 수색해 회계 장부를 확보했다.","Đội điều tra khám xét, thu giữ tại văn phòng và thu được sổ sách kế toán.","Investigators raided the office and secured the account books."]},
   {ko:"공범",rom:"gong-beom",hv:"cộng phạm",vi:"đồng phạm",en:"accomplice",str:["공범을 추적하다","공범 관계"],syn:"",ant:"단독범",ex:["경찰은 추가 공범이 있을 가능성을 열어 두고 수사하고 있다.","Cảnh sát đang điều tra, không loại trừ khả năng còn đồng phạm khác.","Police are investigating the possibility of more accomplices."]},
   {ko:"당부하다",rom:"dang-bu-ha-da",hv:"đương phó",vi:"dặn dò, khuyến cáo",en:"to urge, to ask",str:["주의를 당부하다","협조를 당부하다"],syn:"부탁하다",ant:"",ex:["당국은 시민들에게 외출을 자제해 달라고 당부했다.","Nhà chức trách khuyến cáo người dân hạn chế ra ngoài.","Authorities urged citizens to refrain from going out."]}
  ],
  grammar:[
   {f:"-아/어 놓고",m:"làm sẵn (rồi lợi dụng để)…",ex:"해외에 콜센터를 차려 놓고 수사 기관을 사칭해…",vi:"lập sẵn tổng đài ở nước ngoài rồi mạo danh…"},
   {f:"피동 (붙잡히다, 연루되다)",m:"bị… (câu bị động trong tin pháp luật)",ex:"보이스피싱 조직이 경찰에 무더기로 붙잡혔다.",vi:"đường dây lừa đảo bị cảnh sát bắt giữ hàng loạt.",ref:"g13"},
   {f:"-(으)ㄴ 혐의를 받고 있다",m:"bị cáo buộc đã…",ex:"약 50억 원을 송금받은 혐의를 받고 있다.",vi:"bị cáo buộc đã nhận chuyển khoản khoảng 5 tỷ won."},
   {f:"-는 한편",m:"đồng thời, mặt khác",ex:"…휴대전화 수백 대를 압수하는 한편, 공범들을 추적하고 있다.",vi:"…thu giữ hàng trăm điện thoại, đồng thời truy lùng đồng phạm."},
   {f:"“…”(이)라며 / -다며",m:"nói rằng… (dẫn lời + hành động kèm theo)",ex:"“…요구하지 않는다”며 각별한 주의를 당부했다.",vi:"khuyến cáo đặc biệt cảnh giác, nói rằng “…”"}
  ]
 }
];
