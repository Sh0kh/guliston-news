
import React from "react";
import { useTranslation } from "react-i18next";

export default function ContactHero() {
  const { t, i18n } = useTranslation();
  
  return (
    <section className={'mt-[30px]'}>
      <div className="Container ">
        <h1 className="border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
        {t("Boglanish")}
        </h1>
        <div className="contact_wr   mt-[20px] flex items-start gap-[30px] ">
          <div className="w-[100%] p-[20px] bg-[white] rounded-[10px]">
            <h2 className='text-[18px] font-bold mt-[30px]'>
              {t("Aloqa")}
            </h2>
            <div className='flex items-center gap-[5px] mt-[30px]'>
              <svg xmlns="http://www.w3.org/2000/svg" id="phone-call" width="22.562" height="22.609" viewBox="0 0 22.562 22.609">
                <g id="Сгруппировать_2618" data-name="Сгруппировать 2618" transform="translate(0 0)">
                  <path id="Контур_5922" data-name="Контур 5922" d="M22.509,16.593l-3.155-3.155a2.1,2.1,0,0,0-3.493.789,2.147,2.147,0,0,1-2.479,1.352c-2.254-.563-5.3-3.493-5.86-5.86A2.042,2.042,0,0,1,8.874,7.24a2.1,2.1,0,0,0,.789-3.493L6.508.592a2.251,2.251,0,0,0-3.042,0L1.324,2.733c-2.141,2.254.225,8.226,5.522,13.522s11.268,7.775,13.522,5.521l2.141-2.141A2.25,2.25,0,0,0,22.509,16.593Z" transform="translate(-0.539 0)" fill="#004f97" />
                </g>
              </svg>
              <span>
              {t("Phone-number")}
              </span>
              <a href="tel:+998672254090">(67) 225-40-90</a>
            </div>
            <div className='flex items-center gap-[5px] mt-[30px]'>
              <svg xmlns="http://www.w3.org/2000/svg" id="phone-call" width="22.562" height="22.609" viewBox="0 0 22.562 22.609">
                <g id="Сгруппировать_2618" data-name="Сгруппировать 2618" transform="translate(0 0)">
                  <path id="Контур_5922" data-name="Контур 5922" d="M22.509,16.593l-3.155-3.155a2.1,2.1,0,0,0-3.493.789,2.147,2.147,0,0,1-2.479,1.352c-2.254-.563-5.3-3.493-5.86-5.86A2.042,2.042,0,0,1,8.874,7.24a2.1,2.1,0,0,0,.789-3.493L6.508.592a2.251,2.251,0,0,0-3.042,0L1.324,2.733c-2.141,2.254.225,8.226,5.522,13.522s11.268,7.775,13.522,5.521l2.141-2.141A2.25,2.25,0,0,0,22.509,16.593Z" transform="translate(-0.539 0)" fill="#004f97" />
                </g>
              </svg>
              <span>
              {t("Phone-number")}
              </span>
              <a href="tel:+998672252982">(67) 225-29-82</a>
            </div>
            <div className='flex items-center gap-[5px] mt-[30px]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="23.443" height="16.117" viewBox="0 0 23.443 16.117">
                <g id="email" transform="translate(0 -80)">
                  <g id="Сгруппировать_2620" data-name="Сгруппировать 2620" transform="translate(15.54 82.971)">
                    <g id="Сгруппировать_2619" data-name="Сгруппировать 2619">
                      <path id="Контур_5923" data-name="Контур 5923" d="M339.392,150.1l7.9,5V144.9Z" transform="translate(-339.392 -144.896)" fill="#004f97" />
                    </g>
                  </g>
                  <g id="Сгруппировать_2622" data-name="Сгруппировать 2622" transform="translate(0 82.971)">
                    <g id="Сгруппировать_2621" data-name="Сгруппировать 2621">
                      <path id="Контур_5924" data-name="Контур 5924" d="M0,144.9v10.2l7.9-5Z" transform="translate(0 -144.896)" fill="#004f97" />
                    </g>
                  </g>
                  <g id="Сгруппировать_2624" data-name="Сгруппировать 2624" transform="translate(0.044 80)">
                    <g id="Сгруппировать_2623" data-name="Сгруппировать 2623" transform="translate(0 0)">
                      <path id="Контур_5925" data-name="Контур 5925" d="M22.894,80H2.381A1.447,1.447,0,0,0,.96,81.247l11.678,7.694,11.678-7.694A1.447,1.447,0,0,0,22.894,80Z" transform="translate(-0.96 -80)" fill="#004f97" />
                    </g>
                  </g>
                  <g id="Сгруппировать_2626" data-name="Сгруппировать 2626" transform="translate(0.047 89.062)">
                    <g id="Сгруппировать_2625" data-name="Сгруппировать 2625">
                      <path id="Контур_5926" data-name="Контур 5926" d="M15.175,277.922,13.1,279.287a.736.736,0,0,1-.806,0l-2.073-1.367-9.2,5.818a1.445,1.445,0,0,0,1.418,1.237H22.955a1.445,1.445,0,0,0,1.418-1.237Z" transform="translate(-1.024 -277.92)" fill="#004f97" />
                    </g>
                  </g>
                </g>
              </svg>

              <a href="https://sirdaryo.uz/">sirdaryo_official@umail.uz</a>
            </div>
            <div className='flex items-center gap-[5px] mt-[30px]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#004f97" d="M23 2H1v16h22zM7 10V6h2v4zm4-2V6h2v2zm6 2h-2V6h2zm-6 4V9h2v5zm-2 0H7v-3h2zm6 0v-3h2v3zm6 6H3v2h18z" /></svg>


              <a href="http://sirdaryo.uz/uz/docs/joriqnoma">
              {t("e-mail")}
              </a>
            </div>
            <div className='flex items-center gap-[5px] mt-[30px]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="21.283" height="21.283" viewBox="0 0 21.283 21.283">
                <path id="clock" d="M10.642,0A10.641,10.641,0,1,0,21.283,10.641,10.653,10.653,0,0,0,10.642,0ZM15.7,16.146a.886.886,0,0,1-1.254,0l-4.434-4.434a.883.883,0,0,1-.26-.627V5.321a.887.887,0,0,1,1.773,0v5.4L15.7,14.892A.886.886,0,0,1,15.7,16.146Zm0,0" fill="#004f97" />
              </svg>
              <span>
              {t('Time-work')} : {t('Time-orgin')}

              </span>
            </div>
            <div className='flex items-center gap-[5px] mt-[30px]'>
              <svg xmlns="http://www.w3.org/2000/svg" id="pin" width="18.696" height="28.043" viewBox="0 0 18.696 28.043">
                <g id="Сгруппировать_2616" data-name="Сгруппировать 2616" transform="translate(0)">
                  <path id="Контур_5920" data-name="Контур 5920" d="M94.681,0a9.349,9.349,0,0,0-8.226,13.79L94.17,27.742a.584.584,0,0,0,1.022,0l7.717-13.957A9.349,9.349,0,0,0,94.681,0Zm0,14.022a4.674,4.674,0,1,1,4.674-4.674A4.679,4.679,0,0,1,94.681,14.022Z" transform="translate(-85.333)" fill="#004f97" />
                </g>
              </svg>
              <span>
              {t('New-adress')}

              </span>
            </div>
            <div className='flex items-center gap-[5px] '>
              <svg className='text-[80px]' xmlns="http://www.w3.org/2000/svg" width="28.043" height="1em" viewBox="0 0 24 24"><path fill="#004f97" d="M18 11H6V6h12m-1.5 11a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-9 0A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 14A1.5 1.5 0 0 1 9 15.5A1.5 1.5 0 0 1 7.5 17M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4z"></path></svg>
              <span className='italic'>
              {t('Bus-adress')}
              
              </span>
            </div>
          </div>
          <div className="contact_if m-w-[912] w-full h-[500px] bg-[white] p-[20px] rounded-[10px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2931.542367733867!2d68.77849627589138!3d40.4915254714277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b2073345bb68b5%3A0xa4fb6a9dd9056c19!2sGuliston%20shahar!5e1!3m2!1sru!2s!4v1741610228473!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

    </section>
  )
}