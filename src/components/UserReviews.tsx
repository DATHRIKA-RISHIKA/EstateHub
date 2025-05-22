
import React, { useState, useEffect } from "react";
import { Star, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Dummy data for user reviews
const dummyReviews = [
  {
    id: "1",
    userName: "Rahul Mehta",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.5,
    date: "2023-05-15",
    comment: "I visited this property last week and was very impressed with the amenities and location. The rooms are spacious and well-lit. Highly recommended for families!",
  },
  {
    id: "2",
    userName: "Ananya Singh",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    date: "2023-04-22",
    comment: "Absolutely love this apartment! Great value for money considering the location and facilities provided. The security is excellent, and neighbors are friendly.",
  },
  {
    id: "3",
    userName: "Vikram Patel",
    userImage: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 3.5,
    date: "2023-03-10",
    comment: "The property is good but maintenance could be better. The swimming pool was closed for renovation during my visit. Otherwise, it's a decent place to live.",
  }
];

interface ReviewProps {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

interface UserReviewsProps {
  propertyId: string;
  showAddReview?: boolean;
}

const UserReview: React.FC<ReviewProps> = ({ userName, userImage, rating, date, comment }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="border-b border-border pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <div className="flex items-start gap-4">
        <img 
          src={userImage} 
          alt={userName} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{userName}</h4>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-4 w-4 mr-0.5", 
                        i < Math.floor(rating) 
                          ? "text-yellow-400 fill-yellow-400" 
                          : i < rating 
                            ? "text-yellow-400 fill-yellow-400 stroke-yellow-400 opacity-50" 
                            : "text-gray-300"
                      )} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">{rating.toFixed(1)}</span>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">{formatDate(date)}</span>
          </div>
          <p className="mt-2 text-muted-foreground text-sm">{comment}</p>
        </div>
      </div>
    </div>
  );
};

const UserReviews: React.FC<UserReviewsProps> = ({ propertyId, showAddReview = false }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading reviews
    const fetchReviews = async () => {
      setIsLoading(true);
      // In a real app, fetch reviews from an API
      setTimeout(() => {
        setReviews(dummyReviews);
        setIsLoading(false);
      }, 500);
    };

    fetchReviews();
  }, [propertyId]);

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    if (!newReview.trim()) {
      toast({
        title: "Review required",
        description: "Please write a review before submitting.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, send the review to an API
    const newReviewObj = {
      id: Date.now().toString(),
      userName: "You",
      userImage: "https://randomuser.me/api/portraits/men/1.jpg", // Default user image
      rating,
      date: new Date().toISOString(),
      comment: newReview,
    };

    setReviews([newReviewObj, ...reviews]);
    setNewReview('');
    setRating(0);
    setIsOpen(false);

    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          User Reviews
        </h2>
        {showAddReview && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
                <DialogDescription>
                  Share your experience with this property to help others make informed decisions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-8 w-8 cursor-pointer transition-all",
                        (hoveredRating >= star || rating >= star)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      )}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <Textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Share your thoughts about this property..."
                  className="min-h-[120px]"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitReview}>Submit Review</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-secondary h-10 w-10"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-secondary rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-secondary rounded w-full"></div>
                  <div className="h-4 bg-secondary rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <UserReview key={review.id} {...review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
          <p className="mt-4 text-muted-foreground">No reviews yet. Be the first to review this property!</p>
          {showAddReview && (
            <Button variant="outline" className="mt-4" onClick={() => setIsOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Review
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
