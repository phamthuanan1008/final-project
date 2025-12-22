import React from 'react';
import about01 from '../../../../public/assets/images/about-01.jpg'
import about02 from '../../../../public/assets/images/about-02.jpg';

const About = () => {
    return (
        <React.Fragment>
            {/* Content page */}
            <section className="bg0 p-t-75 p-b-120">
                <div className="container">
                    <div className="row p-b-148">
                        <div className="col-md-7 col-lg-8">
                            <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                                <h3 className="mtext-111 cl2 p-b-16">
                                    Our Story
                                </h3>
                                <p className="stext-113 cl6 p-b-26">
                                    Tất cả bắt đầu từ một niềm tin đơn giản: thời trang không chỉ là quần áo, mà còn là cảm xúc và sự tự tin. Chúng tôi muốn tạo ra một nơi mà mỗi khách hàng, dù là ai, cũng có thể tìm thấy phong cách phù hợp với chính mình.
                                </p>
                                <p className="stext-113 cl6 p-b-26">
                                    Từ những ngày đầu chỉ với vài mẫu thiết kế và một góc nhỏ trưng bày sản phẩm, cửa hàng đã dần trưởng thành nhờ sự tin yêu của khách hàng. Chúng tôi luôn tin rằng mỗi chiếc áo, mỗi chiếc váy đều mang một câu chuyện riêng – câu chuyện về sự tỉ mỉ, niềm đam mê và khát khao mang đến những trải nghiệm tốt nhất.
                                </p>
                                <p className="stext-113 cl6 p-b-26">
                                   Chúng tôi chọn lựa từng chất liệu, từng đường may với mong muốn mang lại sự thoải mái và tự tin cho bạn. Bộ sưu tập của chúng tôi không chạy theo xu hướng ngắn hạn, mà hướng đến những thiết kế tinh tế, linh hoạt và bền vững.
                                </p>
                            </div>
                        </div>
                        <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
                            <div className="how-bor1 ">
                                <div className="hov-img0">
                                    <img src={about01} alt="IMG" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="order-md-2 col-md-7 col-lg-8 p-b-30">
                            <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
                                <h3 className="mtext-111 cl2 p-b-16">
                                    Our Mission
                                </h3>
                                <p className="stext-113 cl6 p-b-26">
                                    Sứ mệnh của chúng tôi là mang đến cho khách hàng những sản phẩm thời trang chất lượng, thoải mái và tinh tế, giúp mỗi người thể hiện phong cách riêng một cách tự tin nhất. Chúng tôi không chỉ bán quần áo — chúng tôi tạo ra trải nghiệm, nơi mỗi thiết kế đều phản ánh sự tỉ mỉ, sự sáng tạo và niềm đam mê dành cho cái đẹp.
                                </p>
                                <div className="bor16 p-l-29 p-b-9 m-t-22">
                                    <p className="stext-114 cl6 p-r-40 p-b-11">
                                        Chúng tôi tin rằng thời trang đẹp nhất là khi nó giúp bạn cảm thấy chính mình.
                                    </p>
                                    <span className="stext-111 cl8">
                                        - by Christian's Founder
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
                            <div className="how-bor2">
                                <div className="hov-img0">
                                    <img src={about02} alt="IMG" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    );
};

export default About;