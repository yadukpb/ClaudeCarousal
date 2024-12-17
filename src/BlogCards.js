import React from 'react';
import { User, Calendar } from 'lucide-react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const BlogCards = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = React.useState([]);
  const [headerData, setHeaderData] = React.useState({
    subtitle: 'Legal News & Updates',
    isEditing: false
  });
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`);
      const data = await response.json();
      setBlogPosts(data.map(post => ({
        id: post._id,
        title: post.title,
        author: post.author.name,
        date: new Date(post.createdAt).toLocaleDateString(),
        image: post.imageUrl
      })));
    };
    fetchBlogs();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const encryptedTokens = localStorage.getItem('tokens');
    const userData = localStorage.getItem('userData');
    if (encryptedTokens && userData) {
      try {
        const user = JSON.parse(userData).user;
        setIsAdmin(user.role === 'admin');
        setHeaderData(prev => ({ ...prev, isEditing: user.role === 'admin' }));
      } catch (error) {
        setIsAdmin(false);
      }
    }
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog1`);
  };

  const CustomArrow = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      className={`absolute ${direction === 'left' ? 'left-[-50px]' : 'right-[-50px]'} top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-orange-50 transition-colors duration-200`}
    >
      <svg
        className={`w-6 h-6 text-orange-500 ${direction === 'left' ? 'rotate-180' : ''}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  const toggleHeaderEdit = () => {
    setHeaderData({
      ...headerData,
      isEditing: !headerData.isEditing
    });
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-10 sm:pb-20">
        <div className="flex justify-between items-start mb-8 sm:mb-16">
          <div className="flex-1">
            <h1 className="font-['Hepta_Slab'] text-5xl sm:text-7xl md:text-[116px] leading-tight sm:leading-[116px] text-[#343842] font-[500]">
              Latest<br />
              Blogs
            </h1>
          </div>
        </div>

        {headerData.isEditing ? (
          <div className="space-y-4">
            <TextField
              fullWidth
              value={headerData.subtitle}
              onChange={(e) => setHeaderData({...headerData, subtitle: e.target.value})}
              variant="outlined"
              label="Subtitle"
            />
          </div>
        ) : (
          <h2 className="font-['Jost'] text-2xl sm:text-[32px] leading-tight sm:leading-[32px] text-[#343842] font-normal mb-4 sm:mb-6">{headerData.subtitle}</h2>
        )}
        {isAdmin && (
          <IconButton 
            onClick={toggleHeaderEdit}
            className="absolute right-0 top-0"
          >
            {headerData.isEditing ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        )}
        {headerData.isEditing ? (
          <TextField
            fullWidth
            value={headerData.subtitle}
            onChange={(e) => setHeaderData({...headerData, subtitle: e.target.value})}
            variant="outlined"
            label="Subtitle"
          />
        ) : (
          <p className="text-gray-600 text-base sm:text-lg mb-10 sm:mb-20 max-w-3xl">{headerData.subtitle}</p>
        )}

        <div className="mx-[-16px] sm:mx-0">
          <Slider {...settings}>
            {blogPosts.map(post => (
              <div key={post.id} className="px-4" onClick={() => handleBlogClick(post.id)}>
                <div className="group cursor-pointer">
                  <div className="mb-4 overflow-hidden rounded-2xl">
                    <img src={post.image} alt={post.title} className="w-full h-48 sm:h-64 object-cover transform transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 mb-2">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span className="text-sm sm:text-base">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="text-sm sm:text-base">{post.date}</span>
                    </div>
                  </div>
                  <h3 className="font-['Hepta_Slab'] text-lg sm:text-xl font-semibold mb-4 group-hover:text-orange-500 transition-colors duration-200">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BlogCards;