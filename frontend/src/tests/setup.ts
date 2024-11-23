import '@testing-library/jest-dom'
import { expect, afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

beforeEach(() => {
	document.body.innerHTML = ''
})

afterEach(() => {
	cleanup()
})