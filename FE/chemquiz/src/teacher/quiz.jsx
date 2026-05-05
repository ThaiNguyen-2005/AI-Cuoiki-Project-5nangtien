import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const EMPTY_QUESTION = () => ({
  id: Date.now() + Math.random(),
  content: "",
  type: "multiple_choice",
  options: ["", "", "", ""],
  correct_index: 0,
  explanation: "",
});

// ===== 100 CÂU HỎI HÓA HỌC CẤP 3 =====
const SAMPLE_QUESTIONS = {
  "10": [
    { content: "Nguyên tử khối của Carbon (C) là bao nhiêu?", options: ["10", "12", "14", "16"], correct_index: 1, explanation: "Carbon có nguyên tử khối là 12 đvC." },
    { content: "Electron có điện tích là:", options: ["+1", "-1", "0", "+2"], correct_index: 1, explanation: "Electron mang điện tích âm, bằng -1." },
    { content: "Cấu hình electron của Na (Z=11) là:", options: ["1s²2s²2p⁶3s¹", "1s²2s²2p⁵3s²", "1s²2s²2p⁶3p¹", "1s²2s²2p⁴3s²"], correct_index: 0, explanation: "Na có 11 electron, cấu hình: 1s²2s²2p⁶3s¹." },
    { content: "Liên kết ion được hình thành giữa:", options: ["Hai phi kim", "Kim loại và phi kim", "Hai kim loại", "Kim loại và kim loại"], correct_index: 1, explanation: "Liên kết ion hình thành giữa kim loại (nhường e) và phi kim (nhận e)." },
    { content: "Phân tử nào sau đây có liên kết cộng hóa trị phân cực?", options: ["H₂", "Cl₂", "HCl", "N₂"], correct_index: 2, explanation: "HCl có liên kết cộng hóa trị phân cực do H và Cl khác độ âm điện." },
    { content: "Số hiệu nguyên tử của Oxi (O) là:", options: ["6", "7", "8", "9"], correct_index: 2, explanation: "Oxi có Z=8, tức là 8 proton." },
    { content: "Phản ứng nào sau đây là phản ứng oxi hóa - khử?", options: ["NaOH + HCl → NaCl + H₂O", "CaCO₃ → CaO + CO₂", "Fe + CuSO₄ → FeSO₄ + Cu", "BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl"], correct_index: 2, explanation: "Fe + CuSO₄: Fe bị oxi hóa (0→+2), Cu²⁺ bị khử (+2→0)." },
    { content: "Trong bảng tuần hoàn, chu kỳ là:", options: ["Hàng ngang", "Hàng dọc", "Ô nguyên tố", "Nhóm nguyên tố"], correct_index: 0, explanation: "Chu kỳ là hàng ngang trong bảng tuần hoàn." },
    { content: "Khí nào sau đây nặng hơn không khí?", options: ["H₂", "He", "NH₃", "CO₂"], correct_index: 3, explanation: "CO₂ có M=44 > M(kk)=29, nên nặng hơn không khí." },
    { content: "Phản ứng: 2H₂ + O₂ → 2H₂O thuộc loại phản ứng nào?", options: ["Phân hủy", "Thế", "Hóa hợp", "Trao đổi"], correct_index: 2, explanation: "Hai chất đơn giản kết hợp tạo một chất mới → phản ứng hóa hợp." },
    { content: "Độ âm điện của Flo (F) so với các nguyên tố khác là:", options: ["Nhỏ nhất", "Trung bình", "Lớn nhất", "Bằng O"], correct_index: 2, explanation: "F có độ âm điện lớn nhất (3,98) trong tất cả các nguyên tố." },
    { content: "Lớp electron ngoài cùng của kim loại kiềm có bao nhiêu electron?", options: ["1", "2", "3", "4"], correct_index: 0, explanation: "Kim loại kiềm (nhóm IA) có 1 electron ở lớp ngoài cùng." },
    { content: "Nguyên tố nào sau đây là phi kim?", options: ["Na", "Fe", "Cu", "S"], correct_index: 3, explanation: "S (lưu huỳnh) là phi kim." },
    { content: "Liên kết nào có năng lượng lớn nhất?", options: ["Liên kết đơn C-C", "Liên kết đôi C=C", "Liên kết ba C≡C", "Liên kết C-H"], correct_index: 2, explanation: "Liên kết ba có năng lượng lớn nhất và độ dài liên kết ngắn nhất." },
    { content: "Phân tử H₂O có dạng hình học là:", options: ["Đường thẳng", "Tam giác đều", "Chữ V (góc)", "Tứ diện"], correct_index: 2, explanation: "H₂O có 2 cặp e không liên kết, dạng góc (chữ V)." },
    { content: "Trong phản ứng: Fe + 2HCl → FeCl₂ + H₂↑, chất bị oxi hóa là:", options: ["Fe", "H⁺", "Cl⁻", "FeCl₂"], correct_index: 0, explanation: "Fe: 0 → +2, tăng số oxi hóa → bị oxi hóa." },
    { content: "Mol là lượng chất chứa bao nhiêu hạt vi mô?", options: ["6,022×10²¹", "6,022×10²²", "6,022×10²³", "6,022×10²⁴"], correct_index: 2, explanation: "1 mol = 6,022×10²³ hạt (số Avogadro)." },
    { content: "Ở điều kiện tiêu chuẩn (đktc), 1 mol khí bất kỳ chiếm thể tích:", options: ["11,2 lít", "22,4 lít", "24 lít", "44,8 lít"], correct_index: 1, explanation: "Ở đktc (0°C, 1 atm), 1 mol khí chiếm 22,4 lít." },
    { content: "Hóa trị của N trong NH₃ là:", options: ["1", "2", "3", "4"], correct_index: 2, explanation: "N có 3 liên kết với H trong NH₃, hóa trị = 3." },
    { content: "Dung dịch axit làm quỳ tím chuyển sang màu:", options: ["Xanh", "Đỏ", "Tím", "Vàng"], correct_index: 1, explanation: "Dung dịch axit có pH<7, làm quỳ tím hóa đỏ." },
    { content: "Công thức phân tử của muối ăn là:", options: ["NaOH", "NaCl", "Na₂CO₃", "NaNO₃"], correct_index: 1, explanation: "Muối ăn là NaCl (Natri clorua)." },
    { content: "Trong bảng tuần hoàn, nhóm VIIA gồm các nguyên tố:", options: ["Kim loại kiềm", "Kim loại kiềm thổ", "Halogen", "Khí hiếm"], correct_index: 2, explanation: "Nhóm VIIA là nhóm Halogen: F, Cl, Br, I, At." },
    { content: "Phản ứng trung hòa là phản ứng giữa:", options: ["Axit và muối", "Bazơ và muối", "Axit và bazơ", "Kim loại và axit"], correct_index: 2, explanation: "Phản ứng trung hòa: Axit + Bazơ → Muối + Nước." },
    { content: "Chất nào sau đây là oxit axit?", options: ["Na₂O", "CaO", "SO₂", "MgO"], correct_index: 2, explanation: "SO₂ là oxit axit (tác dụng với nước tạo H₂SO₃)." },
    { content: "Ký hiệu hóa học của Sắt là:", options: ["Fe", "Ir", "Si", "Sr"], correct_index: 0, explanation: "Sắt ký hiệu là Fe (từ tiếng Latin Ferrum)." },
    { content: "Nguyên tắc bảo toàn khối lượng trong phản ứng hóa học:", options: ["Khối lượng tăng dần", "Khối lượng giảm dần", "Tổng khối lượng chất phản ứng = tổng khối lượng sản phẩm", "Khối lượng không đổi chỉ với phản ứng hóa hợp"], correct_index: 2, explanation: "Định luật bảo toàn khối lượng: m(chất phản ứng) = m(sản phẩm)." },
    { content: "Khối lượng mol của H₂SO₄ là:", options: ["96 g/mol", "98 g/mol", "100 g/mol", "94 g/mol"], correct_index: 1, explanation: "M(H₂SO₄) = 2×1 + 32 + 4×16 = 98 g/mol." },
    { content: "Trong chu kỳ, từ trái sang phải tính chất kim loại:", options: ["Tăng dần", "Giảm dần", "Không đổi", "Tăng rồi giảm"], correct_index: 1, explanation: "Trong chu kỳ, từ trái → phải: tính kim loại giảm, tính phi kim tăng." },
    { content: "Phân tử nào sau đây không phân cực?", options: ["HF", "H₂O", "NH₃", "CCl₄"], correct_index: 3, explanation: "CCl₄ có cấu trúc đối xứng tứ diện đều, mômen lưỡng cực = 0." },
    { content: "Số electron tối đa ở lớp thứ 2 là:", options: ["2", "4", "8", "18"], correct_index: 2, explanation: "Lớp thứ 2 có tối đa 2n² = 2×4 = 8 electron." },
  ],
  "11": [
    { content: "Dung dịch điện li mạnh là dung dịch:", options: ["Dẫn điện kém", "Phân li hoàn toàn trong nước", "Không phân li", "Phân li một phần"], correct_index: 1, explanation: "Chất điện li mạnh phân li hoàn toàn: HCl, NaOH, NaCl..." },
    { content: "pH của dung dịch HCl 0,01M là:", options: ["1", "2", "3", "4"], correct_index: 1, explanation: "HCl → H⁺ + Cl⁻; [H⁺]=0,01M; pH = -log(0,01) = 2." },
    { content: "Phản ứng este hóa là phản ứng giữa:", options: ["Ancol và axit cacboxylic", "Ancol và bazơ", "Axit và muối", "Anđehit và ancol"], correct_index: 0, explanation: "Este hóa: RCOOH + R'OH ⇌ RCOOR' + H₂O (xúc tác H₂SO₄ đặc)." },
    { content: "Công thức tổng quát của ankan là:", options: ["CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₆"], correct_index: 2, explanation: "Ankan (no, mạch hở): CₙH₂ₙ₊₂ (n≥1)." },
    { content: "Etilen (C₂H₄) có loại liên kết nào?", options: ["Chỉ liên kết đơn", "Một liên kết đôi C=C", "Một liên kết ba C≡C", "Vòng thơm"], correct_index: 1, explanation: "C₂H₄ có 1 liên kết đôi C=C (1 σ + 1 π)." },
    { content: "Phản ứng đặc trưng của anken là:", options: ["Phản ứng thế", "Phản ứng cộng", "Phản ứng tách", "Phản ứng cháy"], correct_index: 1, explanation: "Anken có liên kết đôi C=C, dễ tham gia phản ứng cộng." },
    { content: "Benzene (C₆H₆) có tính chất đặc trưng:", options: ["Dễ cộng, khó thế", "Dễ thế, khó cộng", "Dễ cả hai", "Không phản ứng"], correct_index: 1, explanation: "Benzen có vòng thơm bền, ưu tiên phản ứng thế, khó cộng." },
    { content: "Ancol etylic có công thức phân tử là:", options: ["CH₃OH", "C₂H₅OH", "C₃H₇OH", "C₄H₉OH"], correct_index: 1, explanation: "Ancol etylic (ethanol) là C₂H₅OH." },
    { content: "Phản ứng tráng bạc dùng để nhận biết nhóm chức:", options: ["–OH", "–COOH", "–CHO", "–CO–"], correct_index: 2, explanation: "Nhóm anđehit –CHO tác dụng với AgNO₃/NH₃ (tráng bạc)." },
    { content: "Axit axetic có công thức là:", options: ["HCOOH", "CH₃COOH", "C₂H₅COOH", "C₆H₅COOH"], correct_index: 1, explanation: "Axit axetic (giấm) là CH₃COOH." },
    { content: "Sản phẩm của phản ứng cộng HBr vào propilen (CH₃CH=CH₂) theo quy tắc Markovnikov là:", options: ["CH₃CHBrCH₃", "CH₃CH₂CH₂Br", "CH₂BrCH₂CH₃", "CH₃CH₂CHBr₂"], correct_index: 0, explanation: "Theo Markovnikov, H gắn vào C ít H hơn → CH₃CHBrCH₃." },
    { content: "Phân tử glucozo có công thức phân tử là:", options: ["C₆H₁₀O₅", "C₁₂H₂₂O₁₁", "C₆H₁₂O₆", "C₂H₄O₂"], correct_index: 2, explanation: "Glucozo: C₆H₁₂O₆." },
    { content: "Phản ứng xà phòng hóa là phản ứng:", options: ["Este + axit", "Este + NaOH", "Ancol + NaOH", "Axit + NaOH"], correct_index: 1, explanation: "Xà phòng hóa: RCOOR' + NaOH → RCOONa + R'OH." },
    { content: "Chất nào sau đây là đồng đẳng của metan?", options: ["C₂H₄", "C₂H₂", "C₂H₆", "C₆H₆"], correct_index: 2, explanation: "Metan CH₄, đồng đẳng tiếp theo là etan C₂H₆ (cùng dãy ankan)." },
    { content: "Dung dịch NaOH làm quỳ tím chuyển:", options: ["Đỏ", "Tím", "Xanh", "Vàng"], correct_index: 2, explanation: "NaOH là bazơ mạnh, dung dịch pH>7, làm quỳ tím hóa xanh." },
    { content: "Nitơ (N₂) chiếm bao nhiêu % thể tích không khí?", options: ["21%", "78%", "1%", "0,03%"], correct_index: 1, explanation: "Không khí gồm ~78% N₂, ~21% O₂, ~1% Ar và khí khác." },
    { content: "Phản ứng tổng hợp NH₃ (Haber): N₂ + 3H₂ ⇌ 2NH₃ cần điều kiện:", options: ["Áp suất thấp, nhiệt độ cao", "Áp suất cao, nhiệt độ cao, xúc tác Fe", "Áp suất thường, nhiệt độ thường", "Chỉ cần xúc tác"], correct_index: 1, explanation: "Tổng hợp NH₃: 450-500°C, 200-300 atm, xúc tác Fe." },
    { content: "Axit nào sau đây có tính oxi hóa mạnh nhất?", options: ["HCl", "H₂SO₄ loãng", "HNO₃ đặc", "H₃PO₄"], correct_index: 2, explanation: "HNO₃ đặc có tính oxi hóa rất mạnh, tác dụng với hầu hết kim loại." },
    { content: "Photpho trắng (P₄) bảo quản bằng cách:", options: ["Để trong không khí", "Ngâm trong nước", "Đốt cháy", "Để trong cồn"], correct_index: 1, explanation: "P trắng rất độc và dễ cháy, bảo quản bằng cách ngâm trong nước." },
    { content: "Công thức của axit sunfuric là:", options: ["H₂S", "H₂SO₃", "H₂SO₄", "HSO₄"], correct_index: 2, explanation: "Axit sunfuric: H₂SO₄." },
    { content: "Kim loại nào sau đây tác dụng với nước ở nhiệt độ thường?", options: ["Fe", "Cu", "Al", "Na"], correct_index: 3, explanation: "Na phản ứng mạnh với nước: 2Na + 2H₂O → 2NaOH + H₂↑." },
    { content: "Phản ứng của Fe với HCl tạo ra:", options: ["FeCl₃ + H₂", "FeCl₂ + H₂", "Fe₂O₃ + HCl", "FeO + H₂"], correct_index: 1, explanation: "Fe + 2HCl → FeCl₂ + H₂↑ (Fe tạo muối Fe²⁺ với HCl)." },
    { content: "Nhôm (Al) không tan trong dung dịch nào sau đây?", options: ["HCl loãng", "NaOH đặc", "H₂SO₄ loãng", "HNO₃ loãng nguội"], correct_index: 3, explanation: "Al bị thụ động hóa trong HNO₃ đặc nguội và H₂SO₄ đặc nguội." },
    { content: "Tính chất hóa học đặc trưng của kim loại kiềm thổ:", options: ["Tính khử yếu", "Tính oxi hóa", "Tính khử mạnh", "Trơ hóa học"], correct_index: 2, explanation: "Kim loại kiềm thổ (Ca, Mg...) có tính khử mạnh, nhường 2e." },
    { content: "Phương trình điện li của CH₃COOH là:", options: ["CH₃COOH → CH₃COO⁻ + H⁺", "CH₃COOH ⇌ CH₃COO⁻ + H⁺", "CH₃COOH → CH₃⁻ + COOH⁺", "Không điện li"], correct_index: 1, explanation: "CH₃COOH là axit yếu, điện li một phần (dùng ⇌)." },
    { content: "Hiện tượng gì xảy ra khi nhỏ dung dịch AgNO₃ vào dung dịch NaCl?", options: ["Không có hiện tượng", "Kết tủa trắng AgCl xuất hiện", "Kết tủa vàng AgI", "Dung dịch đổi màu"], correct_index: 1, explanation: "Ag⁺ + Cl⁻ → AgCl↓ (kết tủa trắng, không tan trong HNO₃)." },
    { content: "Chất nào sau đây có liên kết hiđro liên phân tử?", options: ["CH₄", "CO₂", "C₂H₆", "CH₃OH"], correct_index: 3, explanation: "CH₃OH (metanol) có nhóm –OH, tạo liên kết hiđro liên phân tử." },
    { content: "Anken có công thức tổng quát:", options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙH₂ₙ₋₆"], correct_index: 1, explanation: "Anken (1 liên kết đôi, mạch hở): CₙH₂ₙ (n≥2)." },
    { content: "Phản ứng polime hóa etilen tạo ra:", options: ["PVC", "PE (polyetilen)", "PP (polypropylen)", "PS (polystyren)"], correct_index: 1, explanation: "nCH₂=CH₂ → (–CH₂–CH₂–)ₙ là PE (polyetilen)." },
    { content: "Amin bậc 1 có nhóm chức:", options: ["–NH₂", "–NH–", "–N<", "=NH"], correct_index: 0, explanation: "Amin bậc 1 có 1 nguyên tử H liên kết với N: R–NH₂." },
  ],
  "12": [
    { content: "Phản ứng thủy phân tinh bột cho sản phẩm cuối cùng là:", options: ["Fructozo", "Saccarozo", "Glucozo", "Mantozo"], correct_index: 2, explanation: "(C₆H₁₀O₅)ₙ + nH₂O → nC₆H₁₂O₆ (glucozo)." },
    { content: "Protein bị thủy phân hoàn toàn cho sản phẩm:", options: ["Glucozo", "Axit béo", "Axit amin", "Glyxerol"], correct_index: 2, explanation: "Protein thủy phân hoàn toàn tạo ra các α-amino axit." },
    { content: "Kim loại nào có độ dẫn điện tốt nhất?", options: ["Cu", "Au", "Al", "Ag"], correct_index: 3, explanation: "Ag (bạc) dẫn điện tốt nhất, tiếp theo là Cu, Au, Al." },
    { content: "Trong pin điện hóa, cực dương là nơi xảy ra phản ứng:", options: ["Oxi hóa", "Khử", "Trung hòa", "Không có phản ứng"], correct_index: 1, explanation: "Cực dương (catot) trong pin: chất bị khử (nhận e)." },
    { content: "Điện phân dung dịch CuSO₄ với điện cực trơ, catot thu được:", options: ["Cu", "O₂", "H₂", "SO₂"], correct_index: 0, explanation: "Catot: Cu²⁺ + 2e⁻ → Cu (đồng bám vào catot)." },
    { content: "Kim loại nào sau đây không tác dụng với dung dịch HCl?", options: ["Fe", "Al", "Cu", "Mg"], correct_index: 2, explanation: "Cu đứng sau H trong dãy hoạt động hóa học, không tác dụng HCl." },
    { content: "Hợp kim nào sau đây được dùng làm vật liệu chịu nhiệt?", options: ["Inox (thép không gỉ)", "Đồng thau", "Bạc Hà", "Hợp kim Vonfram"], correct_index: 3, explanation: "W (Vonfram) có nhiệt độ nóng chảy cao nhất, dùng trong bóng đèn." },
    { content: "Quá trình ăn mòn điện hóa xảy ra khi:", options: ["Kim loại tiếp xúc với axit", "Hai kim loại khác nhau tiếp xúc trong dung dịch điện li", "Kim loại bị đốt cháy", "Kim loại tác dụng với phi kim"], correct_index: 1, explanation: "Ăn mòn điện hóa: 2 kim loại khác nhau + dung dịch điện li → pin galvanic." },
    { content: "Phương pháp bảo vệ kim loại bằng điện hóa là:", options: ["Sơn bề mặt", "Mạ kim loại", "Nối kim loại cần bảo vệ với kim loại hoạt động hơn", "Làm sạch bề mặt"], correct_index: 2, explanation: "Bảo vệ catot: nối Fe với Zn → Zn bị ăn mòn thay Fe." },
    { content: "Sắt (Fe) trong tự nhiên thường tồn tại ở dạng:", options: ["Fe nguyên chất", "FeO", "Fe₂O₃ và Fe₃O₄", "FeCl₃"], correct_index: 2, explanation: "Quặng sắt phổ biến: hematit (Fe₂O₃), magnetit (Fe₃O₄)." },
    { content: "Phản ứng nhiệt nhôm: Al + Fe₂O₃ → Al₂O₃ + Fe dùng để:", options: ["Sản xuất Al", "Hàn đường ray tàu hỏa", "Sản xuất Fe₂O₃", "Tinh chế Al"], correct_index: 1, explanation: "Phản ứng nhiệt nhôm tỏa nhiệt rất lớn, dùng hàn ray và luyện kim." },
    { content: "Crom (Cr) có tính chất nổi bật:", options: ["Mềm, dễ cắt", "Rất cứng, bền với axit thường", "Tan tốt trong nước", "Phản ứng mạnh với oxy"], correct_index: 1, explanation: "Cr là kim loại cứng nhất (độ cứng 9), bền với nhiều axit do màng oxit bảo vệ." },
    { content: "Đồng (Cu) tác dụng với HNO₃ loãng tạo ra:", options: ["CuO + H₂", "Cu(NO₃)₂ + NO + H₂O", "CuSO₄ + NO₂", "Không phản ứng"], correct_index: 1, explanation: "3Cu + 8HNO₃ loãng → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O." },
    { content: "Polime nào sau đây là chất dẻo nhiệt?", options: ["Nhựa bakelit", "Cao su lưu hóa", "Nhựa PE", "Sợi cacbon"], correct_index: 2, explanation: "PE (polyetilen) là chất dẻo nhiệt, nóng chảy được khi đun nóng." },
    { content: "Công thức của glucozo là:", options: ["C₁₂H₂₂O₁₁", "C₆H₁₂O₆", "C₆H₁₀O₅", "C₂H₆O"], correct_index: 1, explanation: "Glucozo: C₆H₁₂O₆, là monosaccarit quan trọng nhất." },
    { content: "Saccarozo thủy phân tạo ra:", options: ["2 glucozo", "Glucozo + fructozo", "2 fructozo", "Glucozo + galactozo"], correct_index: 1, explanation: "Saccarozo + H₂O → Glucozo + Fructozo (xúc tác H⁺ hoặc enzim)." },
    { content: "Axit amin có bao nhiêu nhóm chức đặc trưng?", options: ["1 nhóm –NH₂", "1 nhóm –COOH", "Cả nhóm –NH₂ và –COOH", "Nhóm –OH"], correct_index: 2, explanation: "Axit amin có đồng thời nhóm amin (–NH₂) và axit (–COOH)." },
    { content: "Phương pháp sản xuất nhôm trong công nghiệp:", options: ["Điện phân dung dịch AlCl₃", "Điện phân nóng chảy Al₂O₃", "Nhiệt luyện", "Thủy luyện"], correct_index: 1, explanation: "Al được sản xuất bằng điện phân nóng chảy Al₂O₃ (có criolit Na₃AlF₆)." },
    { content: "Trong sản xuất gang, nguyên liệu chính trong lò cao gồm:", options: ["Fe + C", "Quặng sắt + than cốc + đá vôi", "Fe₂O₃ + Al", "Fe + HCl"], correct_index: 1, explanation: "Lò cao: quặng sắt (Fe₂O₃) + than cốc (C) + đá vôi (CaCO₃)." },
    { content: "Kim loại kiềm được điều chế bằng phương pháp:", options: ["Nhiệt luyện", "Thủy luyện", "Điện phân nóng chảy muối halogenua", "Điện phân dung dịch"], correct_index: 2, explanation: "Kim loại kiềm (Na, K...) hoạt động mạnh, chỉ điều chế bằng điện phân nóng chảy." },
    { content: "Phản ứng nào sau đây minh họa tính lưỡng tính của Al(OH)₃?", options: ["Al(OH)₃ + HCl → AlCl₃ + H₂O", "Al(OH)₃ + NaOH → NaAlO₂ + H₂O", "Cả hai phản ứng trên đều đúng", "Al(OH)₃ không phản ứng"], correct_index: 2, explanation: "Al(OH)₃ vừa tác dụng axit (HCl) vừa tác dụng bazơ (NaOH) → lưỡng tính." },
    { content: "Nước cứng là nước chứa nhiều ion:", options: ["Na⁺, K⁺", "Ca²⁺, Mg²⁺", "Fe²⁺, Fe³⁺", "Cl⁻, SO₄²⁻"], correct_index: 1, explanation: "Nước cứng chứa nhiều Ca²⁺ và Mg²⁺." },
    { content: "Phương pháp làm mềm nước cứng vĩnh cửu:", options: ["Đun sôi", "Dùng Na₂CO₃", "Dùng vôi Ca(OH)₂", "Lọc qua cát"], correct_index: 1, explanation: "Na₂CO₃ kết tủa cả Ca²⁺ và Mg²⁺ → làm mềm nước cứng vĩnh cửu." },
    { content: "Cao su thiên nhiên là polime của monome:", options: ["Isopren (CH₂=C(CH₃)–CH=CH₂)", "Stiren", "Butadien", "Etilen"], correct_index: 0, explanation: "Cao su thiên nhiên: poliisoprен (-CH₂-C(CH₃)=CH-CH₂-)ₙ." },
    { content: "Nhựa PVC được điều chế từ monome:", options: ["Etilen", "Propylen", "Vinyl clorua (CH₂=CHCl)", "Styren"], correct_index: 2, explanation: "nCH₂=CHCl → (–CH₂–CHCl–)ₙ là PVC (polyvinylclorua)." },
    { content: "Hàm lượng cacbon trong thép thường là:", options: ["< 0,1%", "0,01–2%", "2–5%", "> 5%"], correct_index: 1, explanation: "Thép chứa 0,01–2% C; gang chứa 2–5% C." },
    { content: "Phản ứng lên men glucozo tạo ra:", options: ["CH₃COOH", "C₂H₅OH + CO₂", "CH₄ + H₂O", "C₃H₇OH"], correct_index: 1, explanation: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (lên men rượu, xúc tác enzim)." },
    { content: "Chất nào sau đây không phải là polisaccarit?", options: ["Tinh bột", "Xenlulozơ", "Glucozo", "Glicogen"], correct_index: 2, explanation: "Glucozo là monosaccarit (monome), không phải polisaccarit." },
    { content: "Tơ nào sau đây là tơ tổng hợp?", options: ["Tơ tằm", "Bông (cellulose)", "Tơ nilon-6,6", "Len (keratin)"], correct_index: 2, explanation: "Nilon-6,6 là tơ tổng hợp từ hexametylen điamin và axit ađipic." },
    { content: "Nhiệt độ nóng chảy của Na là:", options: ["97,8°C", "180°C", "650°C", "1538°C"], correct_index: 0, explanation: "Na có nhiệt độ nóng chảy thấp ~97,8°C, rất mềm và nhẹ." },
  ],
};

export default function TeacherQuiz() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const subject = "Hóa học";
  const [grade, setGrade] = useState("10");
  const [timeLimit, setTimeLimit] = useState(30);
  const [passingScore, setPassingScore] = useState(70);

  const [questions, setQuestions] = useState([EMPTY_QUESTION()]);
  const [activeQ, setActiveQ] = useState(0);

  const [showImport, setShowImport] = useState(false);
  const [importGrade, setImportGrade] = useState("10");
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [importSearch, setImportSearch] = useState("");

  // ---- Helpers ----
  const updateQuestion = (idx, field, value) => setQuestions(prev => prev.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  const updateOption = (qIdx, oIdx, value) => setQuestions(prev => prev.map((q, i) => {
    if (i !== qIdx) return q;
    const opts = [...q.options]; opts[oIdx] = value; return { ...q, options: opts };
  }));
  const addQuestion = () => { setQuestions(prev => [...prev, EMPTY_QUESTION()]); setActiveQ(questions.length); };
  const removeQuestion = (idx) => { if (questions.length === 1) return; setQuestions(prev => prev.filter((_, i) => i !== idx)); setActiveQ(Math.max(0, idx - 1)); };

  // Import logic
  const sampleList = (SAMPLE_QUESTIONS[importGrade] || []).filter(q =>
    importSearch === "" || q.content.toLowerCase().includes(importSearch.toLowerCase())
  );
  const toggleSample = (idx) => setSelectedSamples(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  const toggleAll = () => setSelectedSamples(selectedSamples.length === sampleList.length ? [] : sampleList.map((_, i) => i));

  const importSelected = () => {
    if (selectedSamples.length === 0) return;
    const toImport = selectedSamples.map(i => ({
      ...EMPTY_QUESTION(),
      content: sampleList[i].content,
      options: sampleList[i].options,
      correct_index: sampleList[i].correct_index,
      explanation: sampleList[i].explanation || "",
    }));
    const hasEmpty = questions.length === 1 && !questions[0].content;
    setQuestions(hasEmpty ? toImport : [...questions, ...toImport]);
    setActiveQ(0);
    setSelectedSamples([]);
    setShowImport(false);
  };

  const handleSubmit = async () => {
    setSaving(true); setErrorMsg("");
    try {
      await axiosClient.post("/teacher/quizzes", {
        title, description, subject, grade,
        time_limit: timeLimit, passing_score: passingScore,
        questions: questions.map(q => ({
          content: q.content, type: q.type,
          options: q.options, correct_index: q.correct_index, explanation: q.explanation,
        })),
      });
      setSuccessMsg("Quiz đã được tạo thành công!");
      setTimeout(() => navigate("/teacher/question"), 1500);
    } catch (e) {
      setErrorMsg(e.response?.data?.message || "Có lỗi xảy ra, thử lại nhé!");
    } finally { setSaving(false); }
  };

  const currentQ = questions[activeQ];
  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="min-h-screen bg-[#080e1c] text-[#dbe2fd] pb-32 font-['Space_Grotesk',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .glass { background: rgba(15,22,40,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(99,102,241,0.15); }
        .glass-bright { background: rgba(30,40,70,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(99,102,241,0.25); }
        .step-active { background: linear-gradient(135deg, #6366f1, #4fdbc8); color: #080e1c; }
        .step-done { background: rgba(99,102,241,0.2); border: 1px solid #6366f1; color: #6366f1; }
        .step-idle { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #4b5563; }
        .option-correct { border-color: #4fdbc8; background: rgba(79,219,200,0.08); }
        .option-idle { border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); }
        .option-idle:hover { border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.06); }
        .q-chip { transition: all 0.2s; }
        .q-chip:hover { transform: scale(1.05); }
        .q-chip-active { background: linear-gradient(135deg,#6366f1,#4fdbc8); color:#080e1c; font-weight:700; }
        .q-chip-idle { background: rgba(255,255,255,0.06); color:#9ca3af; border:1px solid rgba(255,255,255,0.08); }
        .btn-primary { background: linear-gradient(135deg,#6366f1,#4fdbc8); color:#080e1c; font-weight:700; transition:all 0.2s; }
        .btn-primary:hover { opacity:0.9; transform:translateY(-1px); }
        .btn-ghost { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); transition:all 0.2s; }
        .btn-ghost:hover { background:rgba(255,255,255,0.1); }
        input, textarea, select { background:rgba(255,255,255,0.04) !important; border:1px solid rgba(99,102,241,0.2) !important; color:#dbe2fd !important; transition:border 0.2s; }
        input:focus, textarea:focus, select:focus { outline:none; border-color:#6366f1 !important; }
        select option { background:#1a2035; }
        .progress-bar { transition: width 0.5s cubic-bezier(0.4,0,0.2,1); }
        .sample-card { background: rgba(15,22,40,0.9); border: 1px solid rgba(99,102,241,0.15); transition: all 0.2s; cursor: pointer; }
        .sample-card:hover { border-color: rgba(99,102,241,0.4); background: rgba(30,40,70,0.7); }
        .sample-card-selected { border-color: #4fdbc8 !important; background: rgba(79,219,200,0.08) !important; }
        .modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:flex-end;justify-content:center; }
        .modal-sheet { width:100%;max-width:540px;max-height:90vh;overflow-y:auto;background:#0d1628;border-radius:24px 24px 0 0;border:1px solid rgba(99,102,241,0.2);padding:20px; }
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.3);border-radius:2px}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        .slide-up{animation:slideUp 0.3s ease}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-indigo-500/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/teacher/dashboard")} className="btn-ghost p-2 rounded-xl text-gray-400 hover:text-white">
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Tạo mới</p>
            <h1 className="text-base font-black font-['Syne',sans-serif] text-white leading-tight">Bài Quiz</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[{ n: 1, label: "Thông tin" }, { n: 2, label: "Câu hỏi" }, { n: 3, label: "Xem lại" }].map(({ n, label }) => (
            <button key={n} onClick={() => step > n && setStep(n)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${step === n ? "step-active" : step > n ? "step-done cursor-pointer" : "step-idle cursor-default"}`}>
              <span>{step > n ? "✓" : n}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="fixed top-[57px] w-full z-40 h-0.5 bg-white/5">
        <div className="progress-bar h-full bg-gradient-to-r from-indigo-500 to-teal-400" style={{ width: `${progress}%` }} />
      </div>

      {/* ===== STEP 1 ===== */}
      {step === 1 && (
        <main className="pt-28 px-4 max-w-lg mx-auto space-y-5" style={{ animation: "fadeIn 0.3s ease" }}>
          <div className="glass-bright rounded-2xl p-5 space-y-4">
            <h2 className="font-black text-lg font-['Syne',sans-serif] text-white">Thông tin Quiz</h2>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Tiêu đề *</label>
              <input className="w-full rounded-xl px-4 py-3 text-sm" placeholder="VD: Kiểm tra chương 3 - Liên kết hóa học" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Mô tả</label>
              <textarea className="w-full rounded-xl px-4 py-3 text-sm resize-none" rows={3} placeholder="Nội dung, phạm vi kiến thức..." value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Môn học</label>
                <input className="w-full rounded-xl px-4 py-3 text-sm" value="Hóa học" readOnly />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Khối lớp</label>
                <select className="w-full rounded-xl px-4 py-3 text-sm" value={grade} onChange={e => setGrade(e.target.value)}>
                  {["10","11","12"].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Thời gian (phút)</label>
                <input type="number" min={5} max={180} className="w-full rounded-xl px-4 py-3 text-sm" value={timeLimit} onChange={e => setTimeLimit(+e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Điểm đạt (%)</label>
                <input type="number" min={0} max={100} className="w-full rounded-xl px-4 py-3 text-sm" value={passingScore} onChange={e => setPassingScore(+e.target.value)} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[{ icon:"timer",label:"Thời gian",value:`${timeLimit} phút`},{ icon:"school",label:"Khối",value:`Lớp ${grade}`},{ icon:"emoji_events",label:"Điểm đạt",value:`${passingScore}%`}].map(({ icon, label, value }) => (
              <div key={icon} className="glass rounded-xl p-3 text-center">
                <span className="material-symbols-outlined text-indigo-400 text-xl">{icon}</span>
                <p className="text-[10px] text-gray-500 mt-1">{label}</p>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
          <button onClick={() => { if (!title.trim()) { setErrorMsg("Vui lòng nhập tiêu đề!"); return; } setErrorMsg(""); setStep(2); }}
            className="btn-primary w-full py-4 rounded-2xl text-sm flex items-center justify-center gap-2">
            Tiếp theo — Thêm câu hỏi
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
          {errorMsg && <p className="text-red-400 text-xs text-center">{errorMsg}</p>}
        </main>
      )}

      {/* ===== STEP 2 ===== */}
      {step === 2 && (
        <main className="pt-20 px-4 max-w-lg mx-auto" style={{ animation: "fadeIn 0.3s ease" }}>
          {/* Question chips */}
          <div className="flex gap-2 overflow-x-auto py-3 pb-4" style={{ scrollbarWidth:"none" }}>
            {questions.map((q, i) => (
              <button key={q.id} onClick={() => setActiveQ(i)}
                className={`q-chip flex-shrink-0 w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center ${activeQ === i ? "q-chip-active" : "q-chip-idle"}`}>
                {q.content && q.options.every(o => o.trim())
                  ? <span className="material-symbols-outlined" style={{ fontSize:"14px" }}>check</span>
                  : i + 1}
              </button>
            ))}
            <button onClick={addQuestion} className="q-chip flex-shrink-0 w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center glass-bright text-indigo-400 hover:text-white">
              <span className="material-symbols-outlined" style={{ fontSize:"14px" }}>add</span>
            </button>
          </div>

          {/* Import button */}
          <button onClick={() => setShowImport(true)}
            className="w-full mb-4 py-3 rounded-xl border border-dashed border-indigo-500/40 text-indigo-400 text-sm font-bold flex items-center justify-center gap-2 hover:border-indigo-400 hover:bg-indigo-500/5 transition-all">
            <span className="material-symbols-outlined" style={{ fontSize:"18px" }}>library_add</span>
            Chọn từ 100 câu hỏi mẫu Hóa học
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-black">MỚI</span>
          </button>

          {/* Question editor */}
          <div className="glass-bright rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Câu {activeQ + 1} / {questions.length}</span>
              {questions.length > 1 && (
                <button onClick={() => removeQuestion(activeQ)} className="text-red-400 hover:text-red-300 transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nội dung câu hỏi *</label>
              <textarea className="w-full rounded-xl px-4 py-3 text-sm resize-none" rows={3}
                placeholder="Nhập câu hỏi tại đây..."
                value={currentQ.content}
                onChange={e => updateQuestion(activeQ, "content", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Đáp án — Click để chọn đáp án đúng</label>
              {currentQ.options.map((opt, oi) => (
                <div key={oi} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border cursor-pointer transition-all ${currentQ.correct_index === oi ? "option-correct" : "option-idle"}`}
                  onClick={() => updateQuestion(activeQ, "correct_index", oi)}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black ${currentQ.correct_index === oi ? "bg-teal-400 text-[#080e1c]" : "bg-white/10 text-gray-500"}`}>
                    {["A","B","C","D"][oi]}
                  </div>
                  <input className="flex-1 bg-transparent !border-0 text-sm p-0"
                    style={{ background:"transparent!important",border:"none!important",boxShadow:"none!important" }}
                    placeholder={`Đáp án ${["A","B","C","D"][oi]}`}
                    value={opt}
                    onChange={e => { e.stopPropagation(); updateOption(activeQ, oi, e.target.value); }}
                    onClick={e => e.stopPropagation()} />
                  {currentQ.correct_index === oi && <span className="material-symbols-outlined text-teal-400 flex-shrink-0" style={{ fontSize:"16px" }}>check_circle</span>}
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Giải thích (tuỳ chọn)</label>
              <textarea className="w-full rounded-xl px-4 py-3 text-sm resize-none" rows={2}
                placeholder="Giải thích đáp án đúng..."
                value={currentQ.explanation}
                onChange={e => updateQuestion(activeQ, "explanation", e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={() => setStep(1)} className="btn-ghost px-4 py-3 rounded-xl text-sm font-bold text-gray-400">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <button onClick={addQuestion} className="btn-ghost flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 text-indigo-300">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Thêm câu hỏi
            </button>
            <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
              Xem lại <span className="material-symbols-outlined text-lg">preview</span>
            </button>
          </div>
        </main>
      )}

      {/* ===== STEP 3 ===== */}
      {step === 3 && (
        <main className="pt-24 px-4 max-w-lg mx-auto space-y-4" style={{ animation: "fadeIn 0.3s ease" }}>
          <div className="glass-bright rounded-2xl p-5">
            <p className="text-xs text-indigo-400 font-bold tracking-widest uppercase mb-1">{subject} · Lớp {grade}</p>
            <h2 className="text-xl font-black font-['Syne',sans-serif] text-white">{title}</h2>
            {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
            <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
              {[{ icon:"quiz",color:"text-indigo-400",val:`${questions.length} câu`},{ icon:"timer",color:"text-teal-400",val:`${timeLimit} phút`},{ icon:"emoji_events",color:"text-yellow-400",val:`Đạt ${passingScore}%`}].map(({ icon, color, val }) => (
                <div key={icon} className={`flex items-center gap-1.5 text-xs text-gray-400`}>
                  <span className={`material-symbols-outlined ${color}`} style={{ fontSize:"16px" }}>{icon}</span>{val}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {questions.map((q, i) => (
              <div key={q.id} className="glass rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <p className="text-sm text-white font-medium">{q.content || <span className="text-gray-500 italic">Chưa nhập</span>}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-10">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${q.correct_index === oi ? "bg-teal-400/10 border border-teal-400/30 text-teal-300 font-bold" : "bg-white/3 text-gray-500"}`}>
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black flex-shrink-0 ${q.correct_index === oi ? "bg-teal-400 text-[#080e1c]" : "bg-white/10"}`}>{["A","B","C","D"][oi]}</span>
                      {opt || <span className="italic opacity-50">Trống</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {successMsg && <div className="glass-bright border border-teal-400/30 rounded-2xl p-4 flex items-center gap-3 text-teal-400"><span className="material-symbols-outlined">check_circle</span><span className="text-sm font-bold">{successMsg}</span></div>}
          {errorMsg && <div className="glass-bright border border-red-400/30 rounded-2xl p-4 flex items-center gap-3 text-red-400"><span className="material-symbols-outlined">error</span><span className="text-sm font-bold">{errorMsg}</span></div>}

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-ghost px-4 py-3 rounded-xl text-sm font-bold text-gray-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">arrow_back</span>Sửa
            </button>
            <button onClick={handleSubmit} disabled={saving}
              className="btn-primary flex-1 py-4 rounded-2xl text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {saving ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Đang lưu...</>
              : <><span className="material-symbols-outlined text-lg">publish</span>Tạo Quiz</>}
            </button>
          </div>
        </main>
      )}

      {/* ===== MODAL IMPORT ===== */}
      {showImport && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowImport(false)}>
          <div className="modal-sheet slide-up">
            {/* Modal header */}
            <div className="flex items-center justify-between mb-4">
              <div>
<h3 className="text-base font-black text-white">Câu hỏi mẫu Hóa học</h3>                <p className="text-xs text-gray-500 mt-0.5">{selectedSamples.length} câu đã chọn</p>
              </div>
              <button onClick={() => setShowImport(false)} className="p-2 rounded-xl text-gray-400 hover:text-white btn-ghost">
                <span className="material-symbols-outlined" style={{ fontSize:"18px" }}>close</span>
              </button>
            </div>

            {/* Grade tabs */}
            <div className="flex gap-2 mb-3">
              {["10","11","12"].map(g => (
                <button key={g} onClick={() => { setImportGrade(g); setSelectedSamples([]); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${importGrade === g ? "btn-primary" : "btn-ghost text-gray-400"}`}>
                  Lớp {g}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" style={{ fontSize:"16px" }}>search</span>
              <input className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm" placeholder="Tìm câu hỏi..." value={importSearch} onChange={e => setImportSearch(e.target.value)} />
            </div>

            {/* Select all */}
            <button onClick={toggleAll} className="w-full mb-3 py-2 rounded-xl text-xs font-bold text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize:"15px" }}>{selectedSamples.length === sampleList.length ? "deselect" : "select_all"}</span>
              {selectedSamples.length === sampleList.length ? "Bỏ chọn tất cả" : `Chọn tất cả ${sampleList.length} câu`}
            </button>

            {/* Question list */}
            <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
              {sampleList.map((q, i) => {
                const selected = selectedSamples.includes(i);
                return (
                  <div key={i} onClick={() => toggleSample(i)}
                    className={`sample-card rounded-xl p-3 ${selected ? "sample-card-selected" : ""}`}>
                    <div className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border mt-0.5 transition-all ${selected ? "bg-teal-400 border-teal-400" : "border-gray-600"}`}>
                        {selected && <span className="material-symbols-outlined text-[#080e1c]" style={{ fontSize:"12px" }}>check</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-medium line-clamp-2">{q.content}</p>
                        <div className="flex gap-1.5 mt-1.5 flex-wrap">
                          {q.options.map((opt, oi) => (
                            <span key={oi} className={`text-[10px] px-1.5 py-0.5 rounded-md ${q.correct_index === oi ? "bg-teal-400/20 text-teal-400 font-bold" : "bg-white/5 text-gray-500"}`}>
                              {["A","B","C","D"][oi]}: {opt.length > 12 ? opt.slice(0,12)+"…" : opt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Import button */}
            <button onClick={importSelected} disabled={selectedSamples.length === 0}
              className="btn-primary w-full mt-4 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
              <span className="material-symbols-outlined" style={{ fontSize:"18px" }}>download</span>
              Thêm {selectedSamples.length} câu vào quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}