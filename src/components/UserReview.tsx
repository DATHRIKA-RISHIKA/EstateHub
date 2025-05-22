
import React, { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Flag, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ReviewProps {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  className?: string;
}

interface UserReviewsProps {
  propertyId: string;
  className?: string;
  showAddReview?: boolean;
}

// Mock reviews data
const mockReviews: ReviewProps[] = [
  {
    id: "1",
    userName: "Ravi Kumar",
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    date: "2023-04-15",
    comment: "Really enjoyed my stay here. The location is perfect - close to restaurants and shops. The apartment itself was clean and well-maintained. The only small issue was some noise from the street, but overall a great experience.",
    helpful: 12,
    notHelpful: 2
  },
  {
    id: "2",
    userName: "Priya Mehta",
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    date: "2023-03-20",
    comment: "Absolutely loved this property! Everything was perfect from check-in to check-out. The amenities are top-notch and the staff is very friendly and helpful. Would definitely recommend to anyone looking for a comfortable stay.",
    helpful: 18,
    notHelpful: 0
  },
  {
    id: "3",
    userName: "Ajay Singh",
    userAvatar: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 3,
    date: "2023-02-10",
    comment: "Decent place for the price. The location is good but the property needs some maintenance. The bathroom had some issues with hot water. The management was responsive when I reported the issues though.",
    helpful: 8,
    notHelpful: 3
  }
];

const Review: React.FC<ReviewProps> = ({
  id,
  userName,
  userAvatar,
  rating,
  date,
  comment,
  helpful,
  notHelpful,
  className
}) => {
  const [helpfulCount, setHelpfulCount] = useState(helpful);
  const [notHelpfulCount, setNotHelpfulCount] = useState(notHelpful);
  const [userVote, setUserVote] = useState<"helpful" | "notHelpful" | null>(null);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const handleVote = (voteType: "helpful" | "notHelpful") => {
    if (userVote === voteType) {
      // User is cancelling their vote
      if (voteType === "helpful") {
        setHelpfulCount(prev => prev - 1);
      } else {
        setNotHelpfulCount(prev => prev - 1);
      }
      setUserVote(null);
      return;
    }

    if (userVote === "helpful" && voteType === "notHelpful") {
      // User is changing from helpful to not helpful
      setHelpfulCount(prev => prev - 1);
      setNotHelpfulCount(prev => prev + 1);
    } else if (userVote === "notHelpful" && voteType === "helpful") {
      // User is changing from not helpful to helpful
      setNotHelpfulCount(prev => prev - 1);
      setHelpfulCount(prev => prev + 1);
    } else {
      // New vote
      if (voteType === "helpful") {
        setHelpfulCount(prev => prev + 1);
      } else {
        setNotHelpfulCount(prev => prev + 1);
      }
    }

    setUserVote(voteType);
    toast({
      title: "Thank you for your feedback",
      description: "Your opinion helps others make better decisions",
    });
  };

  const reportReview = () => {
    toast({
      title: "Review reported",
      description: "Thank you for flagging this review. We'll look into it.",
    });
  };

  return (
    <div className={cn("p-4 border border-border rounded-lg bg-card", className)}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {userAvatar ? (
            <img 
              src={userAvatar} 
              alt={userName} 
              className="w-10 h-10 rounded-full object-cover" 
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{userName}</h4>
              <div className="flex items-center mt-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "h-4 w-4",
                      index < rating 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {formatDate(date)}
                </span>
              </div>
            </div>
            <button 
              onClick={reportReview}
              className="text-muted-foreground hover:text-destructive"
              title="Report review"
            >
              <Flag className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-sm">{comment}</p>
          <div className="mt-3 flex items-center space-x-4">
            <button 
              onClick={() => handleVote("helpful")}
              className={cn(
                "flex items-center text-sm text-muted-foreground hover:text-foreground",
                userVote === "helpful" && "text-primary font-medium"
              )}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>Helpful ({helpfulCount})</span>
            </button>
            <button 
              onClick={() => handleVote("notHelpful")}
              className={cn(
                "flex items-center text-sm text-muted-foreground hover:text-foreground",
                userVote === "notHelpful" && "text-primary font-medium"
              )}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>Not helpful ({notHelpfulCount})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Review Form component
const ReviewForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive"
      });
      return;
    }
    
    if (comment.trim().length < 10) {
      toast({
        title: "Review too short",
        description: "Please write a more detailed review",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would submit to an API
    console.log({ rating, comment });
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
    
    // Reset form
    setRating(0);
    setComment("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border border-border rounded-lg p-4 bg-card">
      <h4 className="font-medium mb-3">Write a Review</h4>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Rating
        </label>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index + 1)}
              onMouseEnter={() => setHoveredRating(index + 1)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 focus:outline-none"
            >
              <Star
                className={cn(
                  "h-6 w-6 transition-colors",
                  (index < rating || index < hoveredRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                )}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {rating > 0 ? `${rating} stars` : "Select rating"}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 rounded-md border border-input bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[120px]"
          placeholder="Share your experience with this property..."
        />
      </div>
      
      <button 
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
};

const UserReviews: React.FC<UserReviewsProps> = ({
  propertyId,
  className,
  showAddReview = true
}) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // In a real app, fetch reviews based on propertyId
  React.useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setReviews(mockReviews);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchReviews();
  }, [propertyId]);
  
  const toggleReviewForm = () => {
    setShowReviewForm(prev => !prev);
  };
  
  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // In a real app, we would refetch reviews here
  };

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
  
  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Reviews</h3>
          {reviews.length > 0 && (
            <div className="flex items-center mt-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "h-4 w-4",
                      index < Math.round(avgRating) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm">
                {avgRating.toFixed(1)} out of 5 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>
        
        {showAddReview && !showReviewForm && (
          <button
            onClick={toggleReviewForm}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm"
          >
            Write a Review
          </button>
        )}
        
        {showAddReview && showReviewForm && (
          <button
            onClick={toggleReviewForm}
            className="text-sm text-primary hover:text-primary/80"
          >
            Cancel
          </button>
        )}
      </div>
      
      {showAddReview && showReviewForm && (
        <ReviewForm onSubmit={handleReviewSubmitted} />
      )}
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="p-4 border border-border rounded-lg animate-pulse">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-secondary rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-secondary rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-secondary rounded w-1/3 mb-3"></div>
                  <div className="h-3 bg-secondary rounded w-full mb-2"></div>
                  <div className="h-3 bg-secondary rounded w-full mb-2"></div>
                  <div className="h-3 bg-secondary rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map(review => (
            <Review key={review.id} {...review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed border-border rounded-lg bg-secondary/30">
          <p className="text-muted-foreground">No reviews yet</p>
          {showAddReview && !showReviewForm && (
            <button
              onClick={toggleReviewForm}
              className="mt-2 text-primary hover:underline"
            >
              Be the first to review this property
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
