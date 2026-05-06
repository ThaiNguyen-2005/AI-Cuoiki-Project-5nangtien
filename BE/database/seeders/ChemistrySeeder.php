<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\Chapter;
use App\Models\Lesson;
use App\Models\Question;
use App\Models\User;

class ChemistrySeeder extends Seeder
{
    public function run(): void
    {
        $teacher = User::where('role', 'teacher')->first();
        if (!$teacher) return;

        $subject = Subject::firstOrCreate(['name' => 'Hóa học']);

        $realQuestions = [
            '12' => [
                'Chương 1: Ester – Lipid' => [
                    'Ester' => [
                        ['Mùi chuối chín là mùi đặc trưng của ester nào?', ['Isoamyl acetate', 'Ethyl acetate', 'Benzyl acetate', 'Methyl formate'], 'A', 'Isoamyl acetate có mùi chuối chín đặc trưng.'],
                        ['Phản ứng giữa acid và rượu tạo thành ester gọi là phản ứng gì?', ['Ester hóa', 'Xà phòng hóa', 'Trùng hợp', 'Thủy phân'], 'A', 'Phản ứng ester hóa là phản ứng giữa acid và alcohol.'],
                        ['Thủy phân ethyl acetate trong dung dịch NaOH thu được sản phẩm là:', ['CH3COONa và C2H5OH', 'CH3COOH và C2H5OH', 'HCOONa và CH3OH', 'CH3COONa và CH3OH'], 'A', 'Thủy phân trong kiềm tạo muối và alcohol.'],
                        ['Ester nào sau đây có phản ứng tráng bạc?', ['Ethyl formate', 'Methyl acetate', 'Ethyl acetate', 'Propyl acetate'], 'A', 'Các ester của formic acid (H-COO-R) đều có phản ứng tráng bạc.'],
                        ['Hợp chất CH3COOC2H5 có tên gọi là gì?', ['Ethyl acetate', 'Methyl acetate', 'Ethyl formate', 'Methyl propionate'], 'A', 'Gốc ethyl (C2H5) và gốc acetate (CH3COO).'],
                        ['Sản phẩm của phản ứng thủy phân benzyl acetate có mùi gì?', ['Mùi hoa nhài', 'Mùi chuối chín', 'Mùi dứa', 'Mùi táo'], 'A', 'Benzyl acetate có mùi hoa nhài.'],
                        ['Ester no, đơn chức, mạch hở có công thức tổng quát là:', ['CnH2nO2 (n>=2)', 'CnH2n-2O2', 'CnH2nO', 'CnH2n+2O2'], 'A', 'Ester no đơn chức mạch hở là CnH2nO2.'],
                        ['Khi đun nóng ester với dung dịch kiềm, phản ứng này gọi là:', ['Phản ứng xà phòng hóa', 'Phản ứng ester hóa', 'Phản ứng trung hòa', 'Phản ứng thế'], 'A', 'Phản ứng thủy phân ester trong kiềm gọi là xà phòng hóa.'],
                        ['Ester Vinyl acetate có công thức là:', ['CH3COOCH=CH2', 'CH2=CHCOOCH3', 'CH3COOC2H5', 'HCOOCH=CH2'], 'A', 'Gốc vinyl là -CH=CH2.'],
                        ['Số đồng phân ester ứng với công thức phân tử C3H6O2 là:', ['2', '3', '4', '5'], 'A', 'Gồm: HCOOC2H5 và CH3COOCH3.'],
                        ['Xà phòng hóa 8,8g ethyl acetate bằng NaOH vừa đủ thu được bao nhiêu gam muối?', ['8,2g', '10,2g', '6,8g', '12,4g'], 'A', 'n(ester)=0.1 -> m(muối CH3COONa)=0.1*82=8.2g.'],
                        ['Ester nào sau đây khi thủy phân tạo ra anđehit?', ['Vinyl acetate', 'Ethyl acetate', 'Methyl acetate', 'Benzyl acetate'], 'A', 'Ester của vinyl alcohol không bền chuyển thành anđehit.'],
                        ['Phản ứng thủy phân ester trong môi trường acid là phản ứng:', ['Thuận nghịch', 'Một chiều', 'Oxi hóa khử', 'Thế'], 'A', 'Thủy phân ester trong acid tạo acid và rượu là thuận nghịch.'],
                        ['Chất nào sau đây có nhiệt độ sôi thấp nhất?', ['Ethyl acetate', 'Acid acetic', 'Rượu ethyl', 'Nước'], 'A', 'Ester không có liên kết hydrogen nên nhiệt độ sôi thấp.'],
                        ['Dầu chuối là một loại ester được dùng làm hương liệu thực phẩm, thành phần chính là:', ['Isoamyl acetate', 'Ethyl acetate', 'Butyl acetate', 'Propyl acetate'], 'A', 'Dầu chuối là Isoamyl acetate.']
                    ],
                    'Lipid' => [
                        ['Chất béo là triester của glycerol với chất nào?', ['Acid béo', 'Acid vô cơ', 'Acid đa chức', 'Amino acid'], 'A', 'Chất béo là triglyceride của glycerol and acid béo.'],
                        ['Công thức của Tristearin là:', ['(C17H35COO)3C3H5', '(C17H33COO)3C3H5', '(C15H31COO)3C3H5', 'C17H35COOH'], 'A', 'Tristearin tạo từ acid stearic (C17H35COOH).'],
                        ['Triolein có trạng thái vật lý nào ở nhiệt độ thường?', ['Lỏng', 'Rắn', 'Khí', 'Không xác định'], 'A', 'Triolein là chất béo không no nên ở trạng thái lỏng.'],
                        ['Để chuyển hóa dầu thực vật thành mỡ rắn, người ta dùng phản ứng nào?', ['Cộng H2 (Ni, t°)', 'Xà phòng hóa', 'Oxi hóa', 'Thủy phân'], 'A', 'Cộng H2 vào gốc acid béo không no để chuyển sang no.'],
                        ['Khi thủy phân chất béo luôn thu được sản phẩm nào sau đây?', ['Glycerol', 'Ethanol', 'Ethylene glycol', 'Methanol'], 'A', 'Chất béo luôn sinh ra glycerol khi thủy phân.'],
                        ['Số nguyên tử Carbon trong phân tử Tripalmitin là:', ['51', '57', '48', '54'], 'A', '(C15H31COO)3C3H5 có 16*3 + 3 = 51.'],
                        ['Acid béo nào sau đây là acid béo không no?', ['Acid oleic', 'Acid stearic', 'Acid palmitic', 'Acid acetic'], 'A', 'Acid oleic có 1 nối đôi C=C.'],
                        ['Xà phòng là muối của acid béo với kim loại nào?', ['Na hoặc K', 'Ca hoặc Mg', 'Fe hoặc Cu', 'Al hoặc Zn'], 'A', 'Xà phòng là muối Natri hoặc Kali của acid béo.'],
                        ['Phát biểu nào sau đây đúng về chất béo?', ['Nhẹ hơn nước, không tan trong nước', 'Nặng hơn nước, tan trong nước', 'Tan tốt trong nước lạnh', 'Là este của ethylene glycol'], 'A', 'Chất béo nhẹ hơn nước và không tan trong nước.'],
                        ['Để tẩy sạch vết dầu mỡ dính trên quần áo, tốt nhất nên dùng:', ['Xà phòng', 'Nước lạnh', 'Dung dịch muối', 'Dung dịch đường'], 'A', 'Xà phòng có khả năng nhũ hóa dầu mỡ.']
                    ],
                    'Amino Acid' => [
                        ['Amino acid là hợp chất hữu cơ tạp chức, phân tử chứa đồng thời nhóm amino và nhóm:', ['Carboxyl', 'Hydroxyl', 'Aldehyde', 'Ketone'], 'A', 'Định nghĩa amino acid.'],
                        ['Amino acid đơn giản nhất là:', ['Glycine', 'Alanine', 'Valine', 'Lysine'], 'A', 'Glycine có công thức H2N-CH2-COOH.'],
                        ['Trong điều kiện thường, các amino acid là những chất:', ['Kết tinh, vị hơi ngọt, tan tốt trong nước', 'Lỏng, không màu, tan trong dầu', 'Khí, mùi khai, tan trong nước', 'Rắn, không tan trong nước'], 'A', 'Tính chất vật lý đặc trưng.'],
                        ['Chất nào sau đây làm quỳ tím hóa xanh?', ['Lysine', 'Glycine', 'Alanine', 'Acid glutamic'], 'A', 'Lysine có 2 nhóm amino và 1 nhóm carboxyl.'],
                        ['Acid glutamic được dùng làm thuốc:', ['Hỗ trợ thần kinh', 'Giảm đau', 'Kháng sinh', 'Tăng huyết áp'], 'A', 'Ứng dụng của acid glutamic.'],
                        ['Chất nào sau đây là chất lưỡng tính?', ['Alanine', 'Aniline', 'Phenol', 'Alcohol'], 'A', 'Amino acid có tính lưỡng tính.'],
                        ['Liên kết peptide là liên kết -CO-NH- giữa hai đơn vị:', ['alpha-amino acid', 'beta-amino acid', 'Ester', 'Rượu'], 'A', 'Định nghĩa liên kết peptide.'],
                        ['Phản ứng màu biure đặc trưng cho hợp chất chứa ít nhất bao nhiêu liên kết peptide?', ['2', '1', '3', '0'], 'A', 'Từ tripeptide trở lên.'],
                        ['Tên thay thế của Alanine là:', ['Acid 2-aminopropanoic', 'Acid aminoacetic', 'Acid 2-aminobutanoic', 'Acid aminoglutaric'], 'A', 'Danh pháp IUPAC.'],
                        ['Chất nào sau đây tác dụng được với cả NaOH và HCl?', ['H2NCH2COOH', 'CH3COOH', 'C2H5OH', 'CH3NH2'], 'A', 'Tính lưỡng tính của amino acid.']
                    ]
                ],
                'Chương 2: Carbohydrate' => [
                    'Glucose và Fructose' => [
                        ['Glucose có bao nhiêu nhóm hydroxyl (-OH) trong phân tử?', ['5', '4', '6', '3'], 'A', 'Glucose mạch hở có 5 nhóm -OH và 1 nhóm -CHO.'],
                        ['Chất nào sau đây có phản ứng tráng bạc?', ['Glucose', 'Saccharose', 'Tinh bột', 'Cellulose'], 'A', 'Glucose có nhóm aldehyde nên có phản ứng tráng bạc.'],
                        ['Fructose có nhiều trong loại thực phẩm nào?', ['Mật ong', 'Nước mía', 'Gạo', 'Sữa'], 'A', 'Mật ong chứa khoảng 40% fructose.'],
                        ['Sản phẩm khử glucose bằng H2 (Ni, t°) là:', ['Sorbilol', 'Gluconic acid', 'Ethanol', 'Fructose'], 'A', 'Glucose cộng H2 tạo alcohol đa chức sorbitol.'],
                        ['Glucose là loại carbohydrate nào?', ['Monosaccharide', 'Disaccharide', 'Polysaccharide', 'Oligosaccharide'], 'A', 'Glucose là đường đơn.'],
                        ['Hiện tượng khi cho glucose tác dụng với Cu(OH)2 ở nhiệt độ thường:', ['Dung dịch xanh lam', 'Kết tủa đỏ gạch', 'Kết tủa trắng', 'Khí thoát ra'], 'A', 'Tạo phức đồng-glucose màu xanh lam.'],
                        ['Đường nho là tên gọi khác của:', ['Glucose', 'Fructose', 'Saccharose', 'Maltose'], 'A', 'Glucose có nhiều trong quả nho chín.'],
                        ['Trong cơ thể người, glucose được dự trữ ở gan dưới dạng:', ['Glycogen', 'Tinh bột', 'Lipid', 'Protein'], 'A', 'Gan chuyển hóa glucose thừa thành glycogen dự trữ.'],
                        ['Phản ứng lên men rượu từ glucose sinh ra khí nào?', ['CO2', 'O2', 'H2', 'NH3'], 'A', 'C6H12O6 -> 2C2H5OH + 2CO2.'],
                        ['Chất nào sau đây là đồng phân của glucose?', ['Fructose', 'Saccharose', 'Maltose', 'Cellulose'], 'A', 'Cả hai đều có CTPT C6H12O6.']
                    ],
                    'Tinh bột và Cellulose' => [
                        ['Thuốc thử dùng để nhận biết hồ tinh bột là:', ['Dung dịch I2', 'Dung dịch AgNO3', 'Nước Brom', 'Dung dịch NaOH'], 'A', 'I2 tạo màu xanh tím với tinh bột.'],
                        ['Cellulose là thành phần chính của:', ['Sợi bông, gỗ', 'Mật ong', 'Sữa bò', 'Khoai lang'], 'A', 'Vách tế bào thực vật cấu tạo từ cellulose.'],
                        ['Sản phẩm thủy phân hoàn toàn tinh bột là:', ['Glucose', 'Fructose', 'Saccharose', 'Cellulose'], 'A', 'Tinh bột cấu tạo từ các mắt xích alpha-glucose.'],
                        ['Chất nào sau đây dùng sản xuất thuốc súng không khói?', ['Cellulose trinitrate', 'Tinh bột', 'Glucose', 'Saccharose'], 'A', 'Cellulose tác dụng với HNO3 đặc tạo cellulose trinitrate.'],
                        ['Amylopectin trong tinh bột có cấu trúc mạch:', ['Phân nhánh', 'Không phân nhánh', 'Mạch vòng', 'Mạch thẳng'], 'A', 'Amylose mạch thẳng, amylopectin mạch nhánh.'],
                        ['Tinh bột và cellulose là hai chất:', ['Cùng là polysaccharide', 'Đồng phân của nhau', 'Đồng đẳng của nhau', 'Cùng tan tốt trong nước'], 'A', 'Cùng là (C6H10O5)n nhưng giá trị n khác nhau.'],
                        ['Phân tử khối trung bình của cellulose là rất lớn, nó thuộc loại:', ['Polyme', 'Monomer', 'Dimer', 'Oligomer'], 'A', 'Cellulose là polyme thiên nhiên.'],
                        ['Khi nhai kỹ cơm thấy có vị ngọt là do tinh bột chuyển thành:', ['Maltose', 'Glucose', 'Saccharose', 'Fructose'], 'A', 'Enzyme amylase thủy phân tinh bột thành đường maltose.'],
                        ['Cellulose không tan trong nước và các dung môi thông thường nhưng tan trong:', ['Nước Svayde', 'NaOH đặc', 'H2SO4 loãng', 'Benzene'], 'A', 'Nước Svayde hòa tan được cellulose.'],
                        ['Tơ visco, tơ acetate được sản xuất từ:', ['Cellulose', 'Tinh bột', 'Glucose', 'Protein'], 'A', 'Đây là các loại tơ bán tổng hợp từ cellulose.']
                    ]
                ]
            ],
            '11' => [
                'Chương 1: Sự điện li' => [
                    'Sự điện li' => [
                        ['Chất nào sau đây là chất điện li mạnh?', ['NaOH', 'CH3COOH', 'H2O', 'C2H5OH'], 'A', 'NaOH là base mạnh, phân li hoàn toàn.'],
                        ['Dung dịch nào sau đây KHÔNG dẫn được điện?', ['Dung dịch đường saccharose', 'Dung dịch NaCl', 'Dung dịch HCl', 'Dung dịch KOH'], 'A', 'Saccharose không phân li thành ion.'],
                        ['Chất nào sau đây là chất điện li yếu?', ['HF', 'HCl', 'HNO3', 'H2SO4'], 'A', 'HF là acid yếu, phân li một phần.'],
                        ['Dung dịch acid mạnh HCl 0,1M có pH bằng bao nhiêu?', ['1', '0', '13', '14'], 'A', 'pH = -log(0.1) = 1.'],
                        ['Chất nào sau đây là base theo thuyết Bronsted?', ['NH3', 'HCl', 'CO2', 'CH4'], 'A', 'NH3 có khả năng nhận proton H+.'],
                        ['Dung dịch có pH = 10 thì có môi trường gì?', ['Base', 'Acid', 'Trung tính', 'Lưỡng tính'], 'A', 'pH > 7 là môi trường base.'],
                        ['Chất nào sau đây là muối trung hòa?', ['Na2CO3', 'NaHCO3', 'KHSO4', 'NaH2PO4'], 'A', 'Na2CO3 không còn H phân li ra H+.'],
                        ['Chất nào sau đây là muối acid?', ['KHSO4', 'KCl', 'Na2SO4', 'BaCl2'], 'A', 'Gốc HSO4- có khả năng phân li ra H+.'],
                        ['Dung dịch CH3COOH 0,1M có pH như thế nào so với 1?', ['pH > 1', 'pH < 1', 'pH = 1', 'pH = 0'], 'A', 'Acid yếu nên [H+] < 0.1M -> pH > 1.'],
                        ['Để trung hòa 100ml dung dịch NaOH 0,1M cần bao nhiêu ml HCl 0,1M?', ['100ml', '50ml', '200ml', '150ml'], 'A', 'Số mol bằng nhau.']
                    ],
                    'Cân bằng hóa học' => [
                        ['Cân bằng hóa học là trạng thái của phản ứng thuận nghịch khi:', ['v thuận = v nghịch', 'Phản ứng dừng lại', 'v thuận > v nghịch', 'Nồng độ không đổi'], 'A', 'Định nghĩa trạng thái cân bằng.'],
                        ['Yếu tố nào làm thay đổi hằng số cân bằng Kc?', ['Nhiệt độ', 'Nồng độ', 'Áp suất', 'Chất xúc tác'], 'A', 'Kc chỉ phụ thuộc nhiệt độ.'],
                        ['Chất xúc tác có tác dụng gì đối với cân bằng hóa học?', ['Làm phản ứng nhanh đạt tới cân bằng', 'Làm chuyển dịch cân bằng', 'Làm tăng Kc', 'Làm giảm năng lượng hoạt hóa'], 'A', 'Chất xúc tác không làm chuyển dịch cân bằng.'],
                        ['Khi tăng áp suất, cân bằng sẽ chuyển dịch theo chiều:', ['Làm giảm số phân tử khí', 'Làm tăng số phân tử khí', 'Chiều thuận', 'Chiều nghịch'], 'A', 'Nguyên lý Le Chatelier.'],
                        ['Cho phản ứng: N2 + 3H2 <-> 2NH3 (tỏa nhiệt). Để tăng hiệu suất cần:', ['Giảm nhiệt độ, tăng áp suất', 'Tăng nhiệt độ, giảm áp suất', 'Tăng nhiệt độ, tăng áp suất', 'Giảm nhiệt độ, giảm áp suất'], 'A', 'Phản ứng tỏa nhiệt và giảm thể tích khí.'],
                        ['Hệ cân bằng không bị chuyển dịch khi thay đổi áp suất là:', ['H2 + I2 <-> 2HI', 'N2 + 3H2 <-> 2NH3', '2SO2 + O2 <-> 2SO3', 'PCl5 <-> PCl3 + Cl2'], 'A', 'Số mol khí hai bên bằng nhau.'],
                        ['Biểu thức hằng số cân bằng của phản ứng: C(r) + O2(k) <-> CO2(k) là:', ['Kc = [CO2]/[O2]', 'Kc = [CO2]/([C].[O2])', 'Kc = [CO2]', 'Kc = [O2]/[CO2]'], 'A', 'Không đưa nồng độ chất rắn vào biểu thức.'],
                        ['Sự chuyển dịch cân bằng hóa học là sự di chuyển từ trạng thái cân bằng này sang:', ['Trạng thái cân bằng khác', 'Trạng thái dừng', 'Trạng thái hỗn loạn', 'Trạng thái ban đầu'], 'A', 'Khi các điều kiện bên ngoài thay đổi.'],
                        ['Yếu tố nồng độ làm chuyển dịch cân bằng theo chiều:', ['Làm giảm nồng độ chất đó', 'Làm tăng nồng độ chất đó', 'Chiều thuận', 'Chiều nghịch'], 'A', 'Theo nguyên lý Le Chatelier.'],
                        ['Trong công nghiệp sản xuất H2SO4, phản ứng 2SO2 + O2 <-> 2SO3 được thực hiện ở:', ['450-500 độ C, có xúc tác V2O5', '100 độ C', '1000 độ C', 'Áp suất cực cao'], 'A', 'Điều kiện tối ưu cho sản xuất SO3.']
                    ]
                ],
                'Chương 2: Nitrogen – Sulfur' => [
                    'Nitrogen' => [
                        ['Trong tự nhiên, Nitrogen tồn tại chủ yếu ở dạng nào?', ['Khí N2', 'Muối nitrate', 'Ammonia', 'Hợp chất hữu cơ'], 'A', 'N2 chiếm 78% không khí.'],
                        ['Nitrogen thể hiện tính khử khi tác dụng với chất nào?', ['Oxi', 'Hidro', 'Magie', 'Liti'], 'A', 'Tác dụng với oxi tạo NO.'],
                        ['Nitrogen thể hiện tính oxi hóa khi tác dụng với:', ['Kim loại, Hidro', 'Oxi', 'Flo', 'Clo'], 'A', 'N có số oxi hóa giảm từ 0 xuống -3.'],
                        ['Liên kết trong phân tử N2 là liên kết:', ['Ba', 'Đôi', 'Đơn', 'Ion'], 'A', 'N triple bond N rất bền vững.'],
                        ['Tại sao Nitrogen trơ ở nhiệt độ thường?', ['Có liên kết ba rất bền', 'Là chất khí', 'Không có e độc thân', 'Phân tử không cực'], 'A', 'Cần năng lượng lớn để phá vỡ liên kết ba.'],
                        ['Trong phòng thí nghiệm, Nitrogen được điều chế bằng cách:', ['Nhiệt phân NH4NO2', 'Chưng cất phân đoạn không khí', 'Nhiệt phân KNO3', 'Tác dụng Mg với HNO3'], 'A', 'NH4NO2 (t°) -> N2 + 2H2O.'],
                        ['Ứng dụng nào sau đây của Nitrogen lỏng?', ['Bảo quản mẫu sinh học', 'Làm nhiên liệu', 'Làm phân bón', 'Sát trùng'], 'A', 'Nhiệt độ rất thấp (-196 độ C).'],
                        ['Khí Nitơ có trong thành phần của:', ['Không khí', 'Khí gas', 'Khí tự nhiên', 'Khí lò cốc'], 'A', 'Thành phần chính của không khí.'],
                        ['Khi có sấm sét, Nitrogen phản ứng với Oxi tạo ra khí:', ['NO', 'NO2', 'N2O', 'NH3'], 'A', 'Phản ứng xảy ra ở nhiệt độ khoảng 3000 độ C.'],
                        ['Nitrogen chiếm bao nhiêu phần trăm thể tích không khí?', ['78%', '21%', '1%', '0,03%'], 'A', 'Thành phần lớn nhất.']
                    ],
                    'Ammonia và muối ammonium' => [
                        ['Khí Ammonia (NH3) có mùi gì đặc trưng?', ['Mùi khai', 'Mùi xốc', 'Mùi trứng thối', 'Mùi thơm'], 'A', 'NH3 khai và xốc.'],
                        ['NH3 tan rất nhiều trong nước tạo thành dung dịch có tính:', ['Base yếu', 'Acid mạnh', 'Base mạnh', 'Acid yếu'], 'A', 'NH3 + H2O <-> NH4+ + OH-.'],
                        ['Liên kết trong phân tử NH3 là liên kết gì?', ['Cộng hóa trị có cực', 'Cộng hóa trị không cực', 'Ion', 'Kim loại'], 'A', 'Chênh lệch độ âm điện N và H.'],
                        ['Ứng dụng chủ yếu của Ammonia là:', ['Sản xuất phân bón', 'Làm nhiên liệu tên lửa', 'Tráng gương', 'Sát trùng'], 'A', 'Sản xuất phân đạm.'],
                        ['Muối ammonium (NH4+) đều tan tốt trong nước và là chất:', ['Điện li mạnh', 'Điện li yếu', 'Không điện li', 'Lưỡng tính'], 'A', 'Tính chất chung của muối tan.'],
                        ['Nhiệt phân NH4Cl thu được sản phẩm là:', ['NH3 và HCl', 'N2 và H2', 'N2O', 'NO2'], 'A', 'Phản ứng phân hủy thuận nghịch.'],
                        ['Để nhận biết ion ammonium trong dung dịch, người ta dùng:', ['Dung dịch kiềm, đun nóng', 'Dung dịch acid', 'Dung dịch muối ăn', 'Quỳ tím khô'], 'A', 'NH4+ + OH- -> NH3 (mùi khai) + H2O.'],
                        ['Ammonia làm quỳ tím ẩm hóa màu gì?', ['Xanh', 'Đỏ', 'Không đổi màu', 'Vàng'], 'A', 'Tính base.'],
                        ['Hiện tượng "khói trắng" khi đưa hai đầu đũa thủy tinh nhúng vào HCl đặc and NH3 đặc lại gần nhau là do:', ['Tạo thành NH4Cl rắn', 'Tạo thành NH4NO3', 'Khí NH3 bay hơi', 'Khí HCl bay hơi'], 'A', 'NH3 + HCl -> NH4Cl (tinh thể trắng).'],
                        ['Số oxi hóa của N trong NH4+ là:', ['-3', '+3', '+5', '0'], 'A', 'Tính toán số oxi hóa.']
                    ],
                    'Nitric acid và muối nitrate' => [
                        ['Nitric acid (HNO3) tinh khiết là chất lỏng:', ['Không màu, bốc khói mạnh trong không khí ẩm', 'Màu vàng, mùi khai', 'Màu nâu đỏ', 'Xanh lam'], 'A', 'Tính chất vật lý của HNO3.'],
                        ['Dung dịch HNO3 làm quỳ tím chuyển sang màu:', ['Đỏ', 'Xanh', 'Tím', 'Không đổi màu'], 'A', 'Tính acid mạnh.'],
                        ['HNO3 phản ứng với hầu hết các kim loại (trừ Au, Pt) giải phóng khí NO2 khi:', ['Dùng HNO3 đặc', 'Dùng HNO3 loãng', 'Dùng HNO3 rất loãng', 'Ở nhiệt độ thấp'], 'A', 'Sản phẩm khử của HNO3 đặc thường là NO2.'],
                        ['Hỗn hợp "nước cường toan" hòa tan được vàng gồm HNO3 đặc và:', ['HCl đặc theo tỉ lệ thể tích 1:3', 'H2SO4 đặc', 'HF', 'H3PO4'], 'A', 'Nước cường toan (aqua regia).'],
                        ['Nhiệt phân muối NaNO3 thu được sản phẩm gồm:', ['NaNO2 và O2', 'Na2O, NO2 và O2', 'NaOH, NO2', 'N2 và O2'], 'A', 'Nhiệt phân muối nitrate kim loại kiềm.']
                    ],
                    'Sulfur và Sulfuric acid' => [
                        ['Để pha loãng H2SO4 đặc an toàn, người ta thực hiện cách nào?', ['Rót từ từ acid vào nước và khuấy nhẹ', 'Rót từ từ nước vào acid', 'Rót nhanh acid vào nước', 'Đổ cả hai cùng lúc'], 'A', 'Cách pha loãng acid đặc an toàn.'],
                        ['Tính chất nào sau đây KHÔNG phải của H2SO4 đặc?', ['Tính base mạnh', 'Tính oxi hóa mạnh', 'Tính háo nước', 'Tính acid mạnh'], 'A', 'H2SO4 là acid cực mạnh.'],
                        ['Khi tác dụng với Cu, H2SO4 đặc nóng giải phóng khí gì?', ['SO2', 'H2', 'O2', 'H2S'], 'A', 'Cu + 2H2SO4 -> CuSO4 + SO2 + 2H2O.'],
                        ['Thuốc thử dùng để nhận biết ion sulfate (SO4 2-) là:', ['Dung dịch BaCl2', 'Dung dịch AgNO3', 'Dung dịch NaOH', 'Dung dịch HCl'], 'A', 'Tạo kết tủa BaSO4 trắng không tan trong acid.'],
                        ['Sản phẩm chính khi cho đường saccharose tác dụng với H2SO4 đặc là:', ['C và các sản phẩm khí', 'CO2 và H2O', 'SO2 và H2O', 'CH4 và O2'], 'A', 'H2SO4 đặc hút nước của đường rất mạnh.'],
                        ['Ở trạng thái cơ bản, nguyên tử Sulfur (Z=16) có bao nhiêu electron lớp ngoài cùng?', ['6', '4', '2', '8'], 'A', 'Cấu hình e: [Ne] 3s2 3p4.'],
                        ['Trong tự nhiên, sulfur có nhiều ở:', ['Quặng pyrite', 'Nước biển', 'Không khí', 'Cát'], 'A', 'FeS2 là quặng sulfur phổ biến.'],
                        ['Tính chất hóa học đặc trưng của sulfur (S) là:', ['Vừa có tính oxi hóa vừa có tính khử', 'Chỉ có tính oxi hóa', 'Chỉ có tính khử', 'Tính base mạnh'], 'A', 'Do có các mức oxi hóa -2, 0, +4, +6.'],
                        ['Khí Sulfur dioxide (SO2) là một khí:', ['Gây mưa acid', 'Làm thủng tầng ozone', 'Khí gây hiệu ứng nhà kính chính', 'Cung cấp oxi'], 'A', 'SO2 là tác nhân chính gây mưa acid.'],
                        ['Dung dịch H2SO4 loãng phản ứng được với kim loại nào?', ['Fe', 'Cu', 'Ag', 'Au'], 'A', 'H2SO4 loãng chỉ phản ứng với kim loại đứng trước H.']
                    ]
                ]
            ],
            '10' => [
                'Chương 1: Cấu tạo nguyên tử' => [
                    'Thành phần nguyên tử' => [
                        ['Hạt mang điện dương trong nguyên tử là:', ['Proton', 'Electron', 'Neutron', 'Hạt nhân'], 'A', 'Proton mang điện tích +1.'],
                        ['Lớp vỏ nguyên tử cấu tạo bởi hạt nào?', ['Electron', 'Proton', 'Neutron', 'Quark'], 'A', 'Vỏ nguyên tử chứa các electron.'],
                        ['Nguyên tử trung hòa về điện vì:', ['Số proton = số electron', 'Số proton = số neutron', 'Số neutron = số electron', 'Chỉ có neutron'], 'A', 'Điện tích dương triệt tiêu điện tích âm.'],
                        ['Hạt không mang điện trong nguyên tử là:', ['Neutron', 'Proton', 'Electron', 'Ion'], 'A', 'Neutron có điện tích bằng 0.'],
                        ['Nguyên tử có 11 proton thì có bao nhiêu electron?', ['11', '10', '12', '22'], 'A', 'Số p = số e.'],
                        ['Đơn vị khối lượng nguyên tử (amu) được định nghĩa dựa trên khối lượng của:', ['1/12 khối lượng nguyên tử Carbon-12', 'Nguyên tử Hidro', 'Nguyên tử Oxi', 'Nguyên tử Heli'], 'A', 'Quy ước quốc tế.'],
                        ['Khối lượng của một electron xấp xỉ bao nhiêu amu?', ['0,00055', '1', '1,008', '1,007'], 'A', 'Rất nhỏ so với p và n.'],
                        ['Thành phần nào chiếm hầu hết thể tích nguyên tử?', ['Lớp vỏ electron', 'Hạt nhân', 'Proton', 'Neutron'], 'A', 'Cấu tạo rỗng.'],
                        ['Kích thước nguyên tử lớn hơn hạt nhân khoảng bao nhiêu lần?', ['10.000 đến 100.000', '10', '100', '1000'], 'A', 'So sánh kích thước.'],
                        ['Khối lượng nguyên tử tập trung chủ yếu ở:', ['Hạt nhân', 'Vỏ nguyên tử', 'Hạt electron', 'Không gian trống'], 'A', 'Do p và n nặng hơn e rất nhiều.']
                    ],
                    'Cấu hình electron' => [
                        ['Lớp electron thứ n có tối đa bao nhiêu electron?', ['2n^2', 'n^2', '2n', '8'], 'A', 'Quy tắc số e tối đa.'],
                        ['Cấu hình electron của nguyên tử Na (Z=11) là:', ['1s2 2s2 2p6 3s1', '1s2 2s2 2p6', '1s2 2s2 2p6 3s2', '1s2 2s2 2p5'], 'A', 'Viết theo mức năng lượng.'],
                        ['Lớp M (n=3) có tối đa bao nhiêu electron?', ['18', '8', '32', '2'], 'A', '2*3^2 = 18.'],
                        ['Nguyên tố s là những nguyên tố có electron cuối cùng điền vào:', ['Phân lớp s', 'Phân lớp p', 'Phân lớp d', 'Phân lớp f'], 'A', 'Phân loại nguyên tố.'],
                        ['Nguyên tố có cấu hình e lớp ngoài cùng là 3s2 3p5 thuộc nhóm nào?', ['VIIA', 'VA', 'VIIB', 'IA'], 'A', 'Có 7 electron lớp ngoài cùng.'],
                        ['Cấu hình electron của ion Cl- (Z=17) là:', ['1s2 2s2 2p6 3s2 3p6', '1s2 2s2 2p6 3s2 3p5', '1s2 2s2 2p6 3s2 3p4', '1s2 2s2 2p6'], 'A', 'Cl nhận thêm 1e thành Cl-.'],
                        ['Nguyên tố khí hiếm có cấu hình electron lớp ngoài cùng bền vững dạng:', ['ns2 np6 (trừ He)', 'ns2 np5', 'ns2 np4', 'ns2'], 'A', 'Quy tắc bát tử.'],
                        ['Số lớp electron của nguyên tử Fe (Z=26) là:', ['4', '3', '2', '5'], 'A', 'Cấu hình: [Ar] 3d6 4s2.'],
                        ['Các phân lớp electron s, p, d, f có số orbital lần lượt là:', ['1, 3, 5, 7', '1, 2, 3, 4', '2, 4, 6, 8', '1, 3, 4, 5'], 'A', 'Số AO trong mỗi phân lớp.'],
                        ['Mỗi orbital nguyên tử chứa tối đa bao nhiêu electron?', ['2', '6', '10', '14'], 'A', 'Nguyên lý Pauli.']
                    ]
                ],
                'Chương 2: Bảng tuần hoàn' => [
                    'Cấu tạo bảng tuần hoàn' => [
                        ['Chu kỳ 3 trong bảng tuần hoàn có bao nhiêu nguyên tố?', ['8', '2', '18', '32'], 'A', 'Từ Na đến Ar.'],
                        ['Nhóm IA (trừ H) gồm các nguyên tố được gọi là:', ['Kim loại kiềm', 'Kim loại kiềm thổ', 'Halogen', 'Khí hiếm'], 'A', 'Đặc điểm nhóm IA.'],
                        ['Các nguyên tố halogen thuộc nhóm nào?', ['VIIA', 'VIA', 'VIIIA', 'VA'], 'A', 'F, Cl, Br, I, At.'],
                        ['Số thứ tự của ô nguyên tố bằng:', ['Số hiệu nguyên tử Z', 'Số khối A', 'Số neutron N', 'Số lớp electron'], 'A', 'Quy tắc sắp xếp.'],
                        ['Chu kỳ là dãy các nguyên tố có cùng:', ['Số lớp electron', 'Số electron hóa trị', 'Số proton', 'Số hiệu nguyên tử'], 'A', 'Định nghĩa chu kỳ.'],
                        ['Bảng tuần hoàn hiện nay có bao nhiêu cột, bao nhiêu nhóm?', ['18 cột, 8 nhóm A và 8 nhóm B', '8 cột', '10 cột', '16 cột'], 'A', 'Cấu trúc bảng tuần hoàn.'],
                        ['Nhóm VIIIA trong bảng tuần hoàn gồm các nguyên tố:', ['Khí hiếm', 'Halogen', 'Kim loại kiềm', 'Kim loại kiềm thổ'], 'A', 'Nguyên tố trơ.'],
                        ['Nguyên tố ở ô số 12, chu kỳ 3, nhóm IIA là:', ['Mg', 'Na', 'Al', 'Ca'], 'A', 'Magie.'],
                        ['Khối các nguyên tố p gồm các nguyên tố thuộc nhóm:', ['IIIA đến VIIIA (trừ He)', 'IA và IIA', 'Nhóm B', 'Họ Lanthan'], 'A', 'Phân loại theo phân lớp e cuối cùng.'],
                        ['Nguyên tử của nguyên tố X có cấu hình electron [Ne] 3s2. Vị trí của X là:', ['Ô 12, chu kỳ 3, nhóm IIA', 'Ô 10, chu kỳ 2, nhóm IIA', 'Ô 12, chu kỳ 2, nhóm IIA', 'Ô 11, chu kỳ 3, nhóm IA'], 'A', 'Xác định dựa trên cấu hình e.']
                    ],
                    'Xu hướng biến đổi tính chất' => [
                        ['Trong một chu kỳ, theo chiều tăng dần của điện tích hạt nhân, bán kính nguyên tử:', ['Giảm dần', 'Tăng dần', 'Không đổi', 'Biến đổi không quy luật'], 'A', 'Do lực hút của hạt nhân tăng mạnh.'],
                        ['Trong một nhóm A, theo chiều tăng dần của điện tích hạt nhân, tính kim loại:', ['Tăng dần', 'Giảm dần', 'Không đổi', 'Giảm rồi tăng'], 'A', 'Bán kính tăng, dễ nhường electron hơn.'],
                        ['Độ âm điện của các nguyên tố trong một chu kỳ biến đổi như thế nào?', ['Tăng dần', 'Giảm dần', 'Không đổi', 'Giảm rồi tăng'], 'A', 'Khả năng hút e tăng dần.'],
                        ['Nguyên tố nào có độ âm điện lớn nhất trong bảng tuần hoàn?', ['Flo', 'Oxi', 'Clo', 'Fransi'], 'A', 'Flo (F) có độ âm điện là 3,98.'],
                        ['Tính base của các oxide và hydroxide tương ứng của các nguyên tố nhóm IA theo chiều tăng điện tích hạt nhân:', ['Tăng dần', 'Giảm dần', 'Không đổi', 'Biến đổi phức tạp'], 'A', 'Tính kim loại tăng -> tính base tăng.'],
                        ['Trong một chu kỳ, tính phi kim biến đổi như thế nào?', ['Tăng dần', 'Giảm dần', 'Không đổi', 'Tăng rồi giảm'], 'A', 'Độ âm điện tăng, khả năng nhận e tăng.'],
                        ['Nguyên tố phi kim mạnh nhất là:', ['Flo', 'Clo', 'Oxi', 'Nitơ'], 'A', 'Flo.'],
                        ['Nguyên tố kim loại mạnh nhất (không xét phóng xạ) là:', ['Xesi', 'Natri', 'Kali', 'Canxi'], 'A', 'Cs ở cuối nhóm IA.'],
                        ['Xu hướng biến đổi tính acid của các oxit cao nhất trong một chu kỳ là:', ['Tăng dần', 'Giảm dần', 'Không đổi', 'Tăng rồi giảm'], 'A', 'Tính phi kim tăng -> tính acid oxit tăng.'],
                        ['Bán kính nguyên tử của các nguyên tố: Na, Mg, Al sắp xếp theo thứ tự giảm dần là:', ['Na > Mg > Al', 'Al > Mg > Na', 'Mg > Na > Al', 'Na > Al > Mg'], 'A', 'Cùng chu kỳ 3, Z tăng thì bán kính giảm.']
                    ]
                ]
            ]
        ];

        $count = 0;
        $types = ['Khái niệm', 'Lý thuyết', 'Định lý', 'Tính chất', 'Dạng bài tập'];
        $levels = ['easy', 'medium', 'hard'];

        foreach ($realQuestions as $grade => $chapters) {
            foreach ($chapters as $chapName => $lessons) {
                $chapter = Chapter::firstOrCreate(['subject_id' => $subject->id, 'grade' => $grade, 'name' => $chapName]);
                foreach ($lessons as $lessonName => $qs) {
                    $lesson = Lesson::firstOrCreate(['chapter_id' => $chapter->id, 'name' => $lessonName]);
                    foreach ($qs as $q) {
                        $originalOptions = $q[1];
                        $correctText = $originalOptions[0]; // Giả định đáp án đúng luôn ở vị trí đầu trong mảng gốc của seeder
                        
                        // Xáo trộn đáp án
                        $shuffledOptions = $originalOptions;
                        shuffle($shuffledOptions);
                        
                        // Tìm vị trí mới của đáp án đúng
                        $newCorrectIndex = array_search($correctText, $shuffledOptions);
                        $letters = ['A', 'B', 'C', 'D'];
                        $newCorrectLetter = $letters[$newCorrectIndex];

                        Question::create([
                            'lesson_id' => $lesson->id, 
                            'teacher_id' => $teacher->id,
                            'content' => $q[0],
                            'option_a' => $shuffledOptions[0], 
                            'option_b' => $shuffledOptions[1], 
                            'option_c' => $shuffledOptions[2], 
                            'option_d' => $shuffledOptions[3],
                            'correct_answer' => $newCorrectLetter, 
                            'explanation' => $q[3],
                            'level' => $levels[array_rand($levels)], 
                            'knowledge_type' => $types[array_rand($types)], 
                            'difficulty' => rand(1, 5)
                        ]);
                        $count++;
                    }
                }
            }
        }
        echo "\n✅ Đã nạp thành công {$count} câu hỏi Hóa học đa dạng, thông minh 100%!\n";
    }
}
