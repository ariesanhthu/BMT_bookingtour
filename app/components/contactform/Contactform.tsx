import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Contactform = (): React.JSX.Element => {
  return (
    <div className="flex w-1/2 h-full justify-center">
      {/* SỬ DỤNG FORM COMPONENT của shadcn, hook https://ui.shadcn.com/docs/components/input */}
      <form className="justify-center grid w-3/4">
        <Input type="text" placeholder="Tên của bạn" />
        <Input type="text" placeholder="Số điện thoại liên hệ" className='mt-5' />
        
        <Button className='mt-5 justify-self-center' type="submit">
            Liên hệ
        </Button>
      </form>
    </div>
  )
}

export default Contactform;
        