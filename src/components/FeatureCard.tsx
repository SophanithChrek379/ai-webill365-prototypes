'use client';

import { Card, Button } from 'react-bootstrap';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  iconColor?: string;
  buttonText?: string;
  buttonVariant?: string;
  onButtonClick?: () => void;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  iconColor = "primary",
  buttonText = "Learn More",
  buttonVariant = "outline-primary",
  onButtonClick,
  className = ""
}: FeatureCardProps) {
  return (
    <Card className={`h-100 shadow-sm ${className}`}>
      <Card.Body className="text-center">
        <div 
          className={`bg-${iconColor} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} 
          style={{ width: '60px', height: '60px' }}
        >
          <i className={`bi ${icon} text-${iconColor} fs-3`}></i>
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button 
          variant={buttonVariant} 
          size="sm"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
} 