const host = "https://translate.yandex.net"
const apiKey = process.env.TRANSLATE_API_KEY!
const synth = window.speechSynthesis

export interface TranslateResult {
  lang: string
  text: string
}

export interface TranslateApiResult {
  code: number
  lang: string
  text: string[]
}

class Translator {
  private readonly version = "v1.5"

  public constructor(
    private readonly host: string,
    private readonly apiKey: string,
  ) {}

  public speak(text: string, lang: string) {
    if (synth.speaking) {
      synth.cancel()
    }
    const utterThis = new SpeechSynthesisUtterance(text)
    utterThis.lang = lang
    utterThis.rate = 0.8
    synth.speak(utterThis)
  }

  public translate(
    text: string | string[],
    fromLang: string,
    toLang: string,
  ): Promise<TranslateResult> {
    const qs = new URLSearchParams()
    if (Array.isArray(text)) {
      text.forEach(t => qs.append("text", t))
    } else {
      qs.append("text", text)
    }
    qs.set("lang", `${fromLang}-${toLang}`)
    return this.makeRequest<TranslateApiResult>("GET", "translate", qs).then(
      this.processTranslateResponse,
    )
  }

  private processTranslateResponse(
    response: TranslateApiResult,
  ): TranslateResult {
    return {
      lang: response.lang,
      text: response.text[0],
    }
  }

  private async makeRequest<T>(
    method: string,
    path: string,
    params: URLSearchParams = new URLSearchParams(),
    body?: any,
  ): Promise<T> {
    params.set("key", this.apiKey)
    const res = await fetch(this.createUrl(path, params), {
      method,
      body,
    })
    return res.json()
  }

  private createUrl(path: string, params?: URLSearchParams) {
    let result = ""
    result += `${this.host}/api/${this.version}/tr.json/`
    result += path
    let qs = params?.toString()
    if (qs) result += `?${qs}`
    return result
  }
}

export const translator = new Translator(host, apiKey)
