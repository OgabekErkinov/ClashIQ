"use client"
import { CustomCard } from "@/app/components/CustomCard";
import { Lock, Mail, Trophy, Users, Zap } from "lucide-react";
import { CustomInput } from "@/app/components/CustomInput";
import { CustomButton } from "@/app/components/CustomButton";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormFields, loginSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthActions } from "@/hooks/auth.query";


export default function Login() {
  //hooks
  const { login, registr } = useAuthActions()

  //states
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isOTP, setIsOTP] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string>('')
  const [otpTimer, setOtpTimer] = useState(180)
  const [isResend, setIsResend] = useState(false);

  //timer
   useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOTP && otpTimer > 0) {
      interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);
  } else if (otpTimer === 0) {
    setIsResend(true); //if time is over
  }

  return () => clearInterval(interval); //unmount
}, [isOTP, otpTimer]);


  const { register, handleSubmit, formState : { errors }} = useForm<FormFields>({ resolver : yupResolver(loginSchema)})
  const onSubmit: SubmitHandler<FormFields> = (data) => {
  if (isRegister) {
        
    // register
    registr.mutate(data, {
      onError : (error : any) => {
        setServerError(error?.response?.data?.message)
      }
    }) 
  } else {
    login.mutate(data, {
      onError : (error : any) => {
        setServerError(error?.response?.data?.message)
      }
    })
  }
};

// Holatlarni hisoblash
  const isPending = isRegister ? registr.isPending : login.isPending;
  return (
    <div className="full-size">
        <div className="full-size full-center bg-accent-500 p-4">
         <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
           {/* Left side */}
           <div className="hidden md:block text-white">
             <h1 className="text-2xl text-white mb-6">ClashIQ Platform</h1>
             <p className="text-xl mb-8 opacity-90">
               Challenge players worldwide, test your knowledge, and climb the leaderboard!
             </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 full-center bg-white/20 rounded-xl">
                <Zap className="text-white" />
              </div>
              <div>
                <h4 className="text-white">Real-time Duels</h4>
                <p className="opacity-80">Compete in live quiz battles</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 full-center bg-white/20 rounded-xl">
                <Users className="text-white" />
              </div>
              <div>
                <h4 className="text-white">Multiplayer Fun</h4>
                <p className="opacity-80">Challenge friends or random opponents</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 full-center bg-white/20 rounded-xl">
                <Trophy className="text-white" />
              </div>
              <div>
                <h4 className="text-white">Global Leaderboard</h4>
                <p className="opacity-80">Rise to the top and prove your skills</p>
              </div>
            </div>
          </div>
           </div>

           {/* Right side - Login Form */}
           <CustomCard className="bg-white max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="mb-2">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="text-gray-600">
              {isRegister ? 'Join the quiz battle arena' : 'Login to start dueling'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CustomInput
              {...register("email")}
              label="Email"
              type="email"
              placeholder="your@email.com"
              icon={<Mail size={20} />}
              // disabled={isOTP} //to use OTP code one day
              error={errors?.email?.message}
            />

            {/* password */}
            <CustomInput
            {...register("password")}
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={20} />}
            error={errors?.password?.message}
            /> 
            
            {/* if otp code come  */}
            {/* {isRegister && isOTP && (
              <CustomInput
              {...register("code")}
              label={`Check your email — ${Math.floor(otpTimer / 60)}:${(otpTimer % 60).toString().padStart(2, '0')}`}
              type="text"
              placeholder="000000"
              icon={<Lock size={20} />}
              error={errors?.code?.message}
              />
              )} */} 

              

            {/* if otp is sended repassword is shown : it is rejected at now*/}
            {
              isRegister && 
              <CustomInput
              {...register("rePassword")}
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={20} />}
              error={errors?.rePassword?.message}
            />
            }

            {serverError && (
              <div className="p-3 bg-error-50 border border-error-200 rounded-xl text-error-600">
                {serverError}
              </div>
            )}

            <CustomButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isPending}
            >
              {isPending ? 'Loading...' : isRegister ? 'Register' : 'Login'}
            </CustomButton>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-gray-500">or</span>
              </div>
            </div>

             {/* button which to continue as a guest */}
            <CustomButton
              type="button"
              variant="outline"
              size="lg"
              fullWidth
              onClick={()=>console.log('hi')}
            >
              Continue as Guest
            </CustomButton>
          </form>

           </CustomCard>
         </div>
        </div>
    </div>
  );
}

