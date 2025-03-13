from django.core.management.base import BaseCommand
from api.models import Chapter


class Command(BaseCommand):
    help = "Seed dữ liệu cho model Chapter"

    def handle(self, *args, **options):
        chapters_data = [
            {
                "chapter_number": 1,
                "name": "Chăm sóc cơ thể: Tôi yêu thương và trân trọng bản thân",
                "description": """
                    - Cơ thể em là duy nhất và đặc biệt: Nhấn mạnh sự độc đáo của mỗi cơ thể, không so sánh với người khác.
                    - Khuyến khích trẻ trân trọng cơ thể, dù có bất kỳ đặc điểm nào, và nuôi dưỡng lòng tự trọng.
                    - Chức năng kỳ diệu của cơ thể: Giới thiệu một cách đơn giản về các chức năng cơ bản của cơ thể (hít thở, ăn uống, vận động, cảm xúc) để trẻ thấy cơ thể mình thật tuyệt vời.
                    - Chăm sóc sức khỏe toàn diện: Mở rộng nội dung chăm sóc cơ thể không chỉ là vệ sinh mà còn là ăn uống lành mạnh, ngủ đủ giấc, vận động thể chất, và giữ tinh thần vui vẻ.""",
            },
            {
                "chapter_number": 2,
                "name": "Tuổi dậy thì, đừng lo gì: Tôi tự tin tỏa sáng",
                "description": """
                    - An toàn ở mọi nơi: Mở rộng phạm vi an toàn không chỉ ở nhà, ở trường mà còn ở những nơi công cộng, trên mạng internet, khi đi chơi...
                    - Các tình huống nguy hiểm khác: Bên cạnh xâm hại tình dục, giới thiệu thêm về các tình huống nguy hiểm khác trẻ có thể gặp phải (bắt nạt, lạc đường, người lạ dụ dỗ, cháy nổ...).
                    - Không" là một câu nói mạnh mẽ: Tăng cường sự tự tin cho trẻ khi nói "không" và khẳng định quyền được từ chối bất cứ điều gì khiến mình không thoải mái.
                    Lắng nghe trực giác của bản thân: Dạy trẻ tin vào cảm giác của mình và hành động khi cảm thấy "có gì đó không ổn".
                """,
            },
            {
                "chapter_number": 3,
                "name": "An toàn trên internet: Tôi biết bảo vệ chính mình",
                "description": """
                    - Nhận biết và gọi tên cảm xúc: Giúp trẻ nhận diện và gọi tên các cảm xúc khác nhau (vui, buồn, giận, sợ, ngạc nhiên, xấu hổ...) và hiểu rằng mọi cảm xúc đều bình thường.
                    - Thể hiện cảm xúc lành mạnh: Dạy trẻ cách thể hiện cảm xúc một cách phù hợp và không gây hại cho bản thân và người khác.
                    - Tôn trọng cảm xúc của người khác: Khuyến khích trẻ lắng nghe, thấu hiểu và tôn trọng cảm xúc của bạn bè, người thân.
                    - Xây dựng tình bạn đẹp: Dạy trẻ các kỹ năng để kết bạn, duy trì tình bạn, giải quyết xung đột và đối xử tốt với bạn bè.
                    - Các mối quan hệ gia đình yêu thương: Nhấn mạnh vai trò quan trọng của gia đình và tình yêu thương trong gia đình.
                """,
            },
            {
                "chapter_number": 4,
                "name": 'Quản lý cảm xúc: Tôi làm chủ hành vi trong mọi tình huống',
                "description": """
                    - Mỗi người là một cá thể riêng biệt: Nhấn mạnh rằng mỗi người có vẻ ngoài, tính cách, sở thích, khả năng khác nhau và điều đó là hoàn toàn bình thường và đáng quý.
                    - Tôn trọng sự khác biệt: Dạy trẻ tôn trọng sự khác biệt về ngoại hình, giới tính, văn hóa, tôn giáo, khả năng... và không phân biệt đối xử.
                    - Bắt nạt và cách đối phó: Giới thiệu về bắt nạt (bạo lực học đường) và hậu quả của nó. Dạy trẻ cách nhận biết bắt nạt, cách tự bảo vệ mình và giúp đỡ bạn bè khi bị bắt nạt.
                    - Giá trị của sự hòa nhập: Khuyến khích trẻ chơi với tất cả mọi người, không loại trừ ai và tạo môi trường hòa nhập, thân thiện.
                """,
            },
            {
                "chapter_number": 5,
                "name": 'Phòng chống xâm hại: Tôi dám dũng cảm nói "KHÔNG"!',
                "description": """
                    - Cơ thể lớn lên và thay đổi theo thời gian: Giới thiệu về quá trình phát triển của cơ thể từ khi còn bé đến lớn, nhấn mạnh rằng thay đổi là tự nhiên.
                    - Dấu hiệu của tuổi dậy thì (sơ lược, phù hợp lứa tuổi): Giới thiệu một cách đơn giản về những thay đổi cơ bản ở tuổi dậy thì (ví dụ: cao lớn hơn, giọng nói thay đổi, mọc lông...).
                    - Kinh nguyệt và tinh trùng (giới thiệu cơ bản, tùy chọn): Nếu phù hợp và có sự đồng ý của phụ huynh, có thể giới thiệu rất cơ bản về kinh nguyệt ở bạn gái và tinh trùng ở bạn trai như là một phần của sự phát triển tự nhiên (chú trọng tính khoa học, không đi sâu vào chi tiết).
                    - Tò mò là điều tự nhiên: Khuyến khích trẻ đặt câu hỏi về những thay đổi của cơ thể và giải đáp một cách cởi mở, khoa học.
                """,
            },
            {
                "chapter_number": 6,
                "name": "Ước mơ: Tôi kiên trì với mục tiêu của mình",
                "description": """
                    - Vệ sinh cá nhân hàng ngày: Nhắc lại và nhấn mạnh tầm quan trọng của vệ sinh cá nhân (rửa tay, tắm rửa, đánh răng, vệ sinh vùng kín...).
                    - Ăn uống lành mạnh: Giới thiệu về các nhóm thực phẩm cần thiết và tầm quan trọng của việc ăn uống cân bằng, đủ chất.
                    - Vận động và thể dục: Khuyến khích trẻ vận động thường xuyên, tham gia các hoạt động thể chất để tăng cường sức khỏe.
                    - Ngủ đủ giấc: Giải thích tầm quan trọng của giấc ngủ đối với sức khỏe thể chất và tinh thần.
                    - Khám sức khỏe định kỳ: Giới thiệu về vai trò của bác sĩ và tầm quan trọng của việc khám sức khỏe định kỳ để phát hiện và phòng ngừa bệnh tật.
                """,
            },
        ]

        for data in chapters_data:
            chapter, created = Chapter.objects.get_or_create(
                chapter_number=data["chapter_number"], defaults=data
            )
