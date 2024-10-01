<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller; 

use App\Models\BaiViet;
use App\Models\BinhLuan;
use App\Models\ChuDeBaiViet;
use App\Models\HangXe;
use App\Models\LoaiXe;
use App\Models\MauNgoaiThat;
use App\Models\MauNoiThat;
use App\Models\ModelXe;
use App\Models\PhienBanXe;
use App\Models\QuangCao;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TopicController extends Controller
{
    use TrangThaiTrait;

    public function getForum(Request $request)
    {
        // Số lượng bài viết hiển thị trên mỗi trang (mặc định là 10)
        $postsPerPage = $request->input('posts_per_page', 10);

        // Lấy danh sách các chủ đề với phân trang
        $cd = ChuDeBaiViet::paginate(16);

        // Khởi tạo mảng để lưu dữ liệu chủ đề cùng tổng số bình luận
        $chudeData = [];

        // Duyệt qua từng chủ đề để tính tổng số bình luận
        foreach ($cd as $chude) {
            // Lấy tất cả các bài viết thuộc chủ đề này
            $baiVietChuDe = BaiViet::where('MaChuDe', $chude->MaChuDe)->get();
            $soBaiVietChuDe = $baiVietChuDe->count();

            // Tổng số bình luận cho chủ đề này
            $tongBinhLuanChuDe = 0;

            // Duyệt qua từng bài viết thuộc chủ đề này
            foreach ($baiVietChuDe as $baiViet) {
                // Đếm số bình luận của mỗi bài viết
                $soBinhLuanBaiViet = BinhLuan::where('MaBaiViet', $baiViet->MaBaiViet)->count();
                $tongBinhLuanChuDe += $soBinhLuanBaiViet;
            }

            // Lưu dữ liệu chủ đề và tổng số bình luận của chủ đề này vào mảng
            $chudeData[] = [
                'chude' => $chude,
                'tongBinhLuanChuDe' => $tongBinhLuanChuDe,
                'tongSoBaiVietChuDe' => $soBaiVietChuDe
            ];
        }

        // Lấy danh sách các bài viết với phân trang (số lượng hiển thị lấy từ tham số GET)
        $bv = BaiViet::paginate($postsPerPage);

        // Khởi tạo mảng để lưu dữ liệu bài viết cùng số bình luận
        $baivietData = [];

        // Duyệt qua từng bài viết để tính tổng số bình luận
        foreach ($bv as $baiViet) {
            // Đếm số bình luận của mỗi bài viết
            $soBinhLuan = BinhLuan::where('MaBaiViet', $baiViet->MaBaiViet)->count();

            // Lưu dữ liệu bài viết và số bình luận của bài viết này vào mảng
            $baivietData[] = [
                'baiviet' => $baiViet,
                'soBinhLuan' => $soBinhLuan,
                // 'user' => $baiViet->user,
                'ctuser' => $baiViet->user->CTusers ?? null // Thông tin chi tiết người dùng nếu có
            ];
        }
        $db = [
            'chude' => $chudeData,
            'baiviet' => $baivietData,
        ];
        // Trả về dữ liệu để hiển thị trong view
        return  $db ? $this->ok($db) : $this->errors(null);
    }
}
