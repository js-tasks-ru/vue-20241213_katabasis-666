import { defineComponent, ref, onMounted } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = ref(null)
    const loadWeatherData = () => {
      const data = getWeatherData()
      weatherData.value = data.map(item=>({...item,isDay:isLightCart(item.current)}))
      console.log(data)
    }

    const stringToNumber = string => {
      const strArr = string.split(':')
      return +strArr[0]
    }
  
    
    const isLightCart = item => {
      const time = stringToNumber(item.dt)
      const sunrise = stringToNumber(item.sunrise)
      const sunset = stringToNumber(item.sunset)
      return time>=sunrise && time<=sunset 
    }
    
    

    onMounted(() => {
      loadWeatherData()
    })
    
    
   

    return {
      getWeatherData,
      WeatherConditionIcons,
      weatherData,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="item in weatherData" class="weather-card" :class="{'weather-card--night':!item.isDay}" >
          <div v-if="item.alert" :class="{'weather-alert':item.current.wind_speed>=10}">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{item.alert.sender_name}} : {{item.alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{item.geographic_name}}
            </h2>
            <div class="weather-card__time">    
                {{item.current.dt}}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" title="thunderstorm with heavy rain">{{WeatherConditionIcons[item.current.weather.id]}}</div>
            <div class="weather-conditions__temp">{{(item.current.temp - 273.15).toFixed(1)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{Math.ceil(item.current.pressure * 0.75)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{item.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{item.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{item.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
